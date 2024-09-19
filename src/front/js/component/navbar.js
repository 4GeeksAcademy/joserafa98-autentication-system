import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const Navigate = useNavigate ()
	function handleLogout(){
		actions.logout()
		Navigate ('/')
	}
	return (
		<>
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.auth === true ?<button className="btn btn-danger" onClick={()=>handleLogout()}>Logout</button> : ""}
						
				</div>
			</div>
		</nav>
	</>
	);
};
