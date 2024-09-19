import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    const loginUser = (e) => {
        e.preventDefault(); 
        console.log('send data');

        const myHeaders = {
            "Content-Type": "application/json"
        };

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: email, 
                password: password 
            })
        };

        fetch(process.env.BACKEND_URL + '/api/login', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };

	const createUser = (e) => {
        e.preventDefault(); 
        console.log('send data');

        const myHeaders = {
            "Content-Type": "application/json"
        };

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: email, 
                password: password 
            })
        };

		fetch(process.env.BACKEND_URL + '/api/signup', requestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(result);

			setEmail(""); 
			setPassword("");
		})
		.catch((error) => console.error(error));
};

    return (
        <div className="text-center mt-5">
            <div className="container">
                <h1>Hello Rigo!!</h1>
                <form onSubmit={loginUser}>
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
					<button  onClick={createUser} type="button" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        </div>
    );
};

