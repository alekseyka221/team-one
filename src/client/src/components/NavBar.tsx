import React from 'react';
import './NavBar.css'

export const NavBar = () => {
	return (
		<nav>
			<div className="nav-wrapper brown lighten-4">
				<a href="#" className="brand-logo hide-on-med-and-down">BookExchange</a>
					<form className="brand-logo s6 center">
							<div className="input-field col s12">
								<textarea id="textarea1" className="materialize-textarea"></textarea>
							</div>
					</form>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><a href="#">
						Home
					</a></li>
				</ul>
			</div>
		</nav>
	)
}