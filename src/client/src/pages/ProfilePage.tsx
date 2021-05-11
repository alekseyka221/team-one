import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import {NavBar} from "../components/NavBar";
import {BookItem} from "../components/BookItem";
import {UserProfile} from "../components/UserProfile"
export const ProfilePage = () => {
	const [userData, setUserData] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [books, setBooks] : any = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res => res.json()))
			.then(
				(result) => {
					setUserData({
						name: result[0]["name"],
						username: result[0]["username"],
						city: result[0]["address"]["city"]
					})
					setIsLoaded(true);
				},
				(error) => {
					console.log("Error trying to fetch data");
				}
			)
	}, []);

	useEffect(() => {
		fetch("https://openlibrary.org/api/books?bibkeys=ISBN:9788484493402,ISBN:142158042X&format=json&jscmd=data")
			.then((res => res.json()))
			.then(
				(result) => {
					for(const code in result)
					{
						console.log(result[code])
						// @ts-ignore
						setBooks( (books: any) => [...books,
							{
								title: result[code]["title"],
								cover: result[code]["cover"]["large"]
						}])
					}

				},
				(error) => {
					console.log("Error trying to fetch data");
				}
			)
	}, []);

	return (
		<div id="HomePage" className="row l12 m12 s12">
			<NavBar></NavBar>
			<div className=" l12 m12 s12">
				<UserProfile {...userData}/>
			</div>
			<div className="row l12">
				<div className="col l12 red lighten-4">
					<div className="col l6"><h5>На обмене </h5></div>
					<div className="col l6"><h5>Завершенные обмены</h5></div>
				</div>
			</div>
			<div className="mainContent container row ">
				{ books.map((book: any) => <BookItem {...book}/>) }
			</div>
		</div>
	);
}