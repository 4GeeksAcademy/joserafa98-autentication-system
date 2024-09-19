import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    const handleLogin = (e) => {
        e.preventDefault(); 
        actions.loginUser(email, password);
    };

    const handleSignup = (e) => {
        e.preventDefault(); 
        actions.createUser(email, password); 
    };

    return (
		<>
		{store.auth === true ?<Navigate to ="/demo"/> : 
        <div className="text-center mt-5">
            <div className="container">
                <h1>Mi primer formulario</h1>
                <form onSubmit={handleLogin}>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
						<input 
                                type="email" 
                                className="form-control" 
                                id="inputEmail3" 
                                placeholder="put your email here" 
                                value={email}               
                                onChange={(e) => setEmail(e.target.value)} 
                            />

                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
						<input 
                                type="password" 
                                className="form-control" 
                                id="inputPassword3"
                                value={password}             
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
					<button  onClick={handleSignup} type="button" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        </div>
	 }
	 </>
    );
};

