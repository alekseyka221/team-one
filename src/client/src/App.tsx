import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes';
import './App.css'
import {Footer} from "./components/Footer";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {NavBar} from "./components/NavBar";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

function App()
{
	const {token, login, logout, userId} = useAuth()
	const isAuthenticated = !!token

	const routes = useRoutes(isAuthenticated);

	return (
		<AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>
			<ReactNotification />
			<Router>
				{ isAuthenticated && <NavBar /> }
				{routes}
				<Footer/>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
