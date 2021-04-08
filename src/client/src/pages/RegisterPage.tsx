import React, {useState} from 'react';
import './RegisterPage.css';

export const RegisterPage = () => {
	const [agreement, setAgreement] = useState(false);

	const categories = 'Драма Ужасы Психология Детектив Комедия Романы Фэнтези Наука Приключения Манга'.split(' ');


	return (
		<div id="RegisterPage" className="row">
			<div className="regContainer  col l3 s12 m6">
				<label className="reg__label">Имя пользователя
					<input
						className="inputEmail yellow-input input-field white"
						placeholder="Имя пользователя"
					/>
				</label>

				<label className="reg__label ">Никнейм
					<input
						className="inputEmail yellow-input input-field white"
						placeholder="Никнейм"
					/>
				</label>

				<label className="reg__label ">Email
					<input
						className="inputEmail yellow-input input-field white"
						placeholder="Email"
					/>
				</label>
			</div>

			<div className="regContainer  col l3 offset-l1 s12 m6">
				<label className="reg__label">Пароль
					<input
						className="inputEmail yellow-input input-field white"
						placeholder="password"
					/>
				</label>

				<label className="reg__label ">Пароль еще раз
					<input
						className="inputEmail yellow-input input-field white"
						placeholder="Никнейм"
					/>
				</label>

				<label className="reg__label">
					<input type="checkbox" className="filled-in" checked={agreement} onChange={() => setAgreement(!agreement)}/>
					<span >Я принимаю условия</span>
				</label>

				<button
					className="registrationButton waves-effect waves-light btn deep-orange lighten-3"
				>
					Зарегистрироваться
				</button>
			</div>

			<div className="regContainer  col l3 offset-l1 s12 m6">
				<h4 className="selectGenres row">Выберите интересующие жанры</h4>
				{categories.map((c) => {
					return (<label className="checkboxLabel col l6" key={c}>
								<input type="checkbox"
									   className="filled-in"
									   name={c}/>
							   	<span>{c}</span>
							</label>
					)
				})}
			</div>


		</div>
	)
}