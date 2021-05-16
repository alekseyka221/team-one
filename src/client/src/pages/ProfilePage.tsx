import React, {useContext, useEffect, useState} from 'react';
import './css/ProfilePage.css';
import {BookItem} from "../components/BookItem";
import {UserProfile} from "../components/UserProfile"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";
export const ProfilePage = () => {
	const [userData, setUserData] = useState({});
	const [books, setBooks] : any = useState([]);
	const {request} = useHttp()

	const auth = useContext(AuthContext)

	useEffect(() => {
		(async function() {
			const data = await request('/user/profile', 'POST', {
				token: auth.token,
				userId: auth.userId,
			})
			setUserData({
				name: data["user"]["name"],
				city: data["user"]["city"],
				social: data["user"]["social"],
				email: data["user"]["email"],
				photoLink: data["user"]["photoLink"],
				categories: data["user"]["categories"].slice(1) || []
			})
			setBooks(data["books"])
		})()
	}, []);
	return (
		<div id="HomePage" className="row l12 m12 s12">
			<div className=" l12 m12 s12">
				<UserProfile {...userData}/>
			</div>
			<div className="row l12">
				<div className="exchangeButtons col l12">
					<div className="col center l12"><h5>Книги на обмен</h5></div>
				</div>
			</div>
			<div className="mainContent container row ">
				{ books.map((book: any) => <BookItem {...book}/>) }
			</div>


			<div className="fixed-action-btn">
				<a className="btn-floating btn-large red">
					<div className="addButton large material-icons"><NavLink to="/upload">+</NavLink></div>
				</a>
			</div>
		</div>
	);
}