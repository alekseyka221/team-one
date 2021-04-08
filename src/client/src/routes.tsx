import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = (isAuthenticated: boolean) => {
	if (isAuthenticated)
	{
		return (
			<h1>Ты когда авторизоваться успел?</h1>
		)
	}
	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage/>
			</Route>
			<Route path="/register" exact>
				<RegisterPage/>
			</Route>
			<Redirect to="/"/>
		</Switch>
	)
}