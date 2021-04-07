import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";

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
			<Redirect to="/"/>
		</Switch>
	)
}