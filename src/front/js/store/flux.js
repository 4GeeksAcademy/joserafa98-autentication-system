const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false
		},
		actions: {
	
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();

				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			},


			loginUser: (email, password) => {
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
			 
				return fetch(process.env.BACKEND_URL + "/api/login", requestOptions)  
				   .then((response) => {
					  if (response.status === 200) {
						 return response.json();  
					  } else if (response.status === 401) {
						 throw new Error("Correo o contraseña incorrectos");
					  } else {
						 throw new Error("Error en el servidor");
					  }
				   })
				   .then((data) => {
					  console.log(data);
					  setStore({ auth: true });
					  localStorage.setItem("token", data.access_token);
				   })
				   .catch((error) => {
					  console.error("Error durante el login:", error.message);
					  throw error;  
				   });
			 },
			
			
			checkAuth: () => {
				const token = localStorage.getItem("token");
				if (token) {
					setStore({ auth: true }); 
				} else {
					setStore({ auth: false }); 
				}
			},
			
			
			logout: () => {
				setStore({ auth: false });
				localStorage.removeItem("token"); 
			},

			createUser: (email, password) => {
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
			
			return fetch(process.env.BACKEND_URL + "/api/signup", requestOptions) 
					.then((response) => {
						if (response.status === 201) { 
							setStore({ auth: true });
						}
						return response.json(); 
					})
					.then((data) => {
						if (data.access_token) {
							localStorage.setItem("token", data.access_token);
						}
					})
					.catch((error) => {
						console.error("Error during signup:", error);
						throw error; 
					});

			}
			
		}
	};
};

export default getState;
