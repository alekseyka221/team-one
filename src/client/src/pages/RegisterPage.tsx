import React, {useState} from 'react';
import './css/RegisterPage.css';
import {useHttp} from '../hooks/http.hook'
import {Link, useHistory} from 'react-router-dom';
import {store} from "react-notifications-component";

export const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [agreement, setAgreement] = useState(false);
	const [city, setCity] = useState("");
	const [social, setSocial] = useState("");
	const categoriesArray = 'Драма Ужасы Психология Детектив Комедия Романы Фэнтези Наука Приключения Манга'.split(' ');
	const [categories, setCategories] = useState(['']);
	const [photoLink, setPhotoLink] = useState('');
	const {request} = useHttp()

	const history = useHistory()

	const registerHandler = async () => {
		try
		{
			const data = await request('/auth/register', 'POST', {email, password, name, city, categories, photoLink})
			console.log(data.message)
			history.push("/")
		} catch (e)
		{
			store.addNotification(notifications.errorRegistering)
		}
	}

	const notifications = {
		errorRegistering: {
			title: "Ошибка!!",
			message: "Не удалось зарегистрироваться",
			type: "danger" as "danger",
			insert: "bottom" as "bottom",
			container: "bottom-right" as "bottom-right",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 2000,
				onScreen: true,
				pauseOnHover: true
			}
		},
	}

	return (
		<div id="RegisterPage" className="row">
			<div>
				<Link to="/"><img src="https://i.imgur.com/AVUHaGN.png" height="100px"/></Link>
			</div>
			<div className="row" id="containerWrapper">
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

					<label className="reg-container__label">
						<span className="label__description">Пароль</span>
						<input
							type="password"
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
							type="password"
							className="yellow-input input-field white"
							placeholder="Пароль еще раз"
							value={checkPassword}
							onChange={(event => {
								setCheckPassword(event.target.value);
							})}
						/>
					</label>
				</div>

				<div className="formLower reg-container  col l3 offset-l1 s12 m6 brown lighten-2">
					<label className="reg-container__label">
						<span className="label__description">Город</span>
						<input
							className="yellow-input input-field white"
							placeholder="город"
							value={city}
							onChange={(event => {
								setCity(event.target.value);
							})}
						/>
					</label>

					<label className="reg-container__label">
						<span className="label__description">Соц сеть</span>
						<input
							className="yellow-input input-field white"
							placeholder="соцсеть"
							value={social}
							onChange={(event => {
								setSocial(event.target.value);
							})}
						/>
					</label>

					<label className="reg-container__label">
						<span className="label__description">Ссылка на аватар</span>
						<input
							className="yellow-input input-field white"
							placeholder="аватар"
							value={photoLink}
							onChange={(event => {
								setPhotoLink(event.target.value);
							})}
						/>
					</label>

					<label className="reg-container__label agreement">
						<input type="checkbox"
							   className="filled-in checkbox-blue-grey"
							   checked={agreement}
							   onChange={() => setAgreement(!agreement)}
						/>
						<span className="black-text">Я принимаю условия</span>
					</label>

					<button
						className="waves-effect waves-light btn deep-orange lighten-3 black-text"
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
									   className="filled-in checkbox-blue-grey"
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


		</div>
	)
}