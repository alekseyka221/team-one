import React, {useContext, useEffect, useState} from 'react';
import './css/HomePage.css';
import {BookItem} from "../components/BookItem";
import {AuthContext} from "../context/AuthContext";
import Select from 'react-select'
import {useHttp} from "../hooks/http.hook";

export const HomePage = () => {
	const [books, setBooks] : any = useState([]);
	const [filters, setFilters]: any = useState(null);
	const {loading, request, error, clearError} = useHttp()

	const auth = useContext(AuthContext)

	const options = [
		{ value: "Драма", label: "Драма"},
		{ value: "Ужасы", label: "Ужасы"},
		{ value: "Психология", label: "Психология"},
		{ value: "Детектив", label: "Детектив"},
		{ value: "Комедия", label: "Комедия"},
		{ value: "Романы", label: "Романы"},
		{ value: "Фэнтези", label: "Фэнтези"},
		{ value: "Наука", label: "Наука"},
		{ value: "Приключения", label: "Приключения"},
		{ value: "Манга", label: "Манга"},
		{ value: "Другое", label: "Другое"}
	]

	useEffect( () => {
		(async function() {
			let filter: any = []
			if(filters !== null)
			{
				filter = [filters.value]
			}
			try
			{
				const data = await request('/catalog/get', 'POST', {
					token: auth.token,
					userId: auth.userId,
					filter: filter
				})
				console.log(data["books"])
				setBooks(data["books"]);
			}
			catch (e)
			{
				console.log("Something went wrong");
				setFilters([])
			}
		})()
	}, [filters])


	return (
		<div id="HomePage" className="row l12 m12 s12">
			<div className="row l12">
				<h5 className="motivationQuote col offset-l1 l2 m6">
					Найди то, что тебе по душе
				</h5>
				<div className="filters col l4 offset-l3  m6">
					<h5 className="center">Фильтры</h5>
					<Select
						onChange={setFilters}
						className="basic-multi-select"
						classNamePrefix="select"
						options={options}
					/>
				</div>
			</div>
			<div className="mainContent container row ">
				{ books.map((book: any) => <BookItem {...book}/>) }
			</div>
		</div>
	);
}