import React, {useContext, useEffect, useState} from 'react';
import './RegisterPage.css';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from "../context/AuthContext";
import {URLSearchParams} from "url";

type Dict = { [key: string]: boolean };

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [agreement, setAgreement] = useState(false);
	const categoriesArray = 'Драма Ужасы Психология Детектив Комедия Романы Фэнтези Наука Приключения Манга'.split(' ');
	const [categories, setCategories] = useState(['']);
	const {loading, request, error, clearError} = useHttp()

	const auth = useContext(AuthContext)

	const registerHandler = async () => {
		try
		{
			console.log(login);
			const data = await request('/auth/register', 'POST', {email, login, password})
			console.log(data.message)
		} catch (e)
		{
		}
	}

	return (
		<div id="RegisterPage" className="row">
			<div className="reg-container  col l3 m6 s12 ">
				<label className="reg-container__label">
					<span className="label__description">Имя пользователя</span>
					<input
						className="yellow-input input-field white"
						placeholder="Имя пользователя"
						value={name}
						onChange={(event => {
							setName(event.target.value);
						})}
					/>
				</label>

				<label className="reg-container__label ">
					<span className="label__description">Логин для входа</span>
					<input
						className="yellow-input input-field white"
						placeholder="Никнейм"
						value={login}
						onChange={(event => {
							setLogin(event.target.value);
						})}
					/>
				</label>

				<label className="reg-container__label ">
					<span className="label__description">Email</span>
					<input
						className="yellow-input input-field white"
						placeholder="Email"
						value={email}
						onChange={(event => {
							setEmail(event.target.value);
						})}
					/>
				</label>
			</div>

			<div className="reg-container  col l3 offset-l1 s12 m6">
				<label className="reg-container__label">
					<span className="label__description">Пароль</span>
					<input
						className="yellow-input input-field white"
						placeholder="Пароль"
						value={password}
						onChange={(event => {
							setPassword(event.target.value);
						})}
					/>
				</label>

				<label className="reg-container__label ">
					<span className="label__description">Пароль еще раз</span>
					<input
						className="yellow-input input-field white"
						placeholder="Пароль еще раз"
						value={checkPassword}
						onChange={(event => {
							setCheckPassword(event.target.value);
						})}
					/>
				</label>

				<label className="reg-container__label">
					<input type="checkbox"
						   className="filled-in"
						   checked={agreement}
						   onChange={() => setAgreement(!agreement)}
					/>
					<span>Я принимаю условия</span>
				</label>

				<button
					className="waves-effect waves-light btn deep-orange lighten-3"
					onClick={registerHandler}
				>
					Зарегистрироваться
				</button>
			</div>

			<div className="reg-container  col l3 offset-l1 s12 m6">
				<h4 className="selectGenres row">Выберите интересующие жанры</h4>
				{categoriesArray.map((categoryName) => {
					return (<label
							className="checkboxLabel col l6"
							key={categoryName}
						>
							<input type="checkbox"
								   className="filled-in"
								   checked={categories.includes(categoryName)}
								   onChange={() => {
									   if (categories.includes((categoryName)))
									   {
										   setCategories(categories.filter(c => c !== categoryName));
									   } else
									   {
										   setCategories([...categories, categoryName]);
									   }

								   }}
							/>
							<span>{categoryName}</span>
						</label>
					)
				})}
			</div>


		</div>
	)
}