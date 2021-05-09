import React from 'react';
import './ProfilePage.css';
import {NavBar} from "../components/NavBar";
import {BookItem} from "../components/BookItem";
import {UserProfile} from "../components/UserProfile"
export const ProfilePage = () => {
	return (
		<div id="HomePage" className="row l12 m12 s12">
			<NavBar></NavBar>
			<div className=" l12 m12 s12">
				<UserProfile/>
			</div>
			<div className="row l12">
				<div className="col l12 red lighten-4">
					<div className="col l6"><h5>На обмене</h5></div>
					<div className="col l6"><h5>Завершенные обмены</h5></div>
				</div>
			</div>
			<div className="mainContent container row ">
				<BookItem/>
				<BookItem/>
				<BookItem/>
				<BookItem/>
				<BookItem/>
				<BookItem/>
			</div>
		</div>
	);
}