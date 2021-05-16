import React, {useContext} from 'react';
import './NavBar.css'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const NavBar = () => {

	const history = useHistory()
	const auth = useContext(AuthContext)

	const logoutHandler = (event: any) => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}


	return (
		<nav>
			<div className="nav-wrapper brown lighten-4">
				<NavLink to="/home"><img src="https://i.imgur.com/AVUHaGN.png" height="64px"/></NavLink>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><NavLink to="/profile">Профиль</NavLink></li>
					<li><a href="/" onClick={logoutHandler}>Выйти</a></li>
				</ul>
			</div>
		</nav>
	)
}