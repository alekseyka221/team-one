import React from 'react';
import './HomePage.css';
import {NavBar} from "../components/NavBar";
import {BookItem} from "../components/BookItem";

export const HomePage = () => {
	return (
		<div id="HomePage" className="row l12 m12 s12">
			<NavBar></NavBar>
			<div className="row l12">
				<div className="col l2 m6">
					Найди то, что тебе по душе
				</div>
				<div className="col l2 offset-l10 m6">
					Фильтры
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