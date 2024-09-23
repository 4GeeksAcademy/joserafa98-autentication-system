"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    
    if user is None:
        return jsonify({"msg": "This is not the email that are we looking for"}), 404  
    
    if email is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401  


    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200



@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Email is already registered"}), 409

    hashed_password = generate_password_hash(password)  # <--- Hashea la contraseña
    new_user = User(email=email, password=hashed_password, is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Error registering user", "error": str(e)}), 500
    
    access_token = create_access_token(identity=new_user.id)
    return jsonify({"msg": "User created successfully", "access_token": access_token}), 201

@api.route("/private", methods=["GET"])
@jwt_required()  
def private_route():
    current_user = get_jwt_identity()
    
    response_body = {
        "msg": f"Bienvenido {current_user}, has accedido a la ruta privada."
    }

    return jsonify(response_body), 200
