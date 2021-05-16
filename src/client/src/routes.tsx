import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from "./pages/AuthPage";
import {RegisterPage} from "./pages/RegisterPage";
import {HomePage} from './pages/HomePage'
import {ProfilePage} from "./pages/ProfilePage";
import {UploadPage} from "./pages/UploadPage";
import {BookPage} from "./pages/BookPage";

export const useRoutes = (isAuthenticated: boolean) => {
	if (isAuthenticated)
	{
		return (
			<Switch>
				<Route path="/home" exact>
					<HomePage/>
				</Route>
				<Route path="/profile" exact>
					<ProfilePage/>
				</Route>
				<Route path="/upload" exact>
					<UploadPage/>
				</Route>
				<Route path="/book/:id">
					<BookPage/>
				</Route>
				<Redirect to="/home"/>
			</Switch>
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