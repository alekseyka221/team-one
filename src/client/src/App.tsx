import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes';
import './App.css'
import {Footer} from "./components/Footer";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App()
{
	const {token, login, logout, userId, ready} = useAuth()
	const isAuthenticated = !!token

	const routes = useRoutes(isAuthenticated);

	return (
		// @ts-ignore
		<AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
			<div className="App">
				<Router>
					{routes}
				</Router>
				<Footer/>
			</div>
		</AuthContext.Provider>

	);
}

export default App;
