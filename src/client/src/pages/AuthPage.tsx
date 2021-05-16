import React, {useContext, useState} from 'react';
import './css/AuthPage.css';
import {useHttp} from "../hooks/http.hook";
import { useHistory } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {store} from "react-notifications-component";

export const AuthPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {loading, request, error, clearError} = useHttp()

	const history = useHistory();
	const auth = useContext(AuthContext)

	const goToRegister = () =>{
		let path = `register`;
		history.push(path);
	}

	const goToProfile = () =>{
		let path = `profile`;
		history.push(path);
	}

	const authHandler = async () => {
		try
		{
			const data = await request('/auth/login', 'POST', {email, password})
			auth.login(data.token, data.userId)
		} catch (e)
		{
			store.addNotification(notifications.incorrectCredentials);
		}
	}

	const notifications = {
		incorrectCredentials: {
			title: "Error!",
			message: "Incorrect login and/or password",
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
		<div id="AuthPage" className="row l12 m12 s12">
			<div className="authSpacer hide-on-med-and-down"></div>
			<div className="infoContainer col l8 m6 s12">
				<div className="infoRows col l8 right-align">
					<div className="infoUnderlined row ">
						Выставляй!
					</div>
					<div className="infoRectangle col l8 offset-l4 right-aligned">
						Выкладывай ненужные книги для обмена
					</div>
					<div className="infoUnderlined row">
						Выбирай!
					</div>
					<div className="infoRectangle col l8 offset-l4 right-aligned row">
						Ищи предложения по душе. Договаривайся
					</div>
					<div className="infoUnderlined row">
						Обменивай!
					</div>
				</div>
				<div className="infoProgress l4 left-align">
					<svg width="78" height="430" viewBox="0 0 78 566" fill="none" xmlns="http://www.w3.org/2000/svg">
						<line x1="43.0405" y1="24.0178" x2="40.4999" y2="524.011" stroke="#6D6875" stroke-width="7"/>
						<g filter="url(#filter0_d)">
							<circle cx="38" cy="524" r="34" fill="#FFB4A2"/>
						</g>
						<g filter="url(#filter1_d)">
							<circle cx="38" cy="286" r="34" fill="#E5989B"/>
						</g>
						<g filter="url(#filter2_d)">
							<ellipse cx="40" cy="33.5" rx="34" ry="33.5" fill="#B5838D"/>
						</g>
						<path d="M36.248 524.621H38.6914C40.2266 524.598 41.4336 524.193 42.3125 523.408C43.1914 522.623 43.6309 521.562 43.6309 520.227C43.6309 517.227 42.1367 515.727 39.1484 515.727C37.7422 515.727 36.6172 516.131 35.7734 516.939C34.9414 517.736 34.5254 518.797 34.5254 520.121H31.2734C31.2734 518.094 32.0117 516.412 33.4883 515.076C34.9766 513.729 36.8633 513.055 39.1484 513.055C41.5625 513.055 43.4551 513.693 44.8262 514.971C46.1973 516.248 46.8828 518.023 46.8828 520.297C46.8828 521.41 46.5195 522.488 45.793 523.531C45.0781 524.574 44.0996 525.354 42.8574 525.869C44.2637 526.314 45.3477 527.053 46.1094 528.084C46.8828 529.115 47.2695 530.375 47.2695 531.863C47.2695 534.16 46.5195 535.982 45.0195 537.33C43.5195 538.678 41.5684 539.352 39.166 539.352C36.7637 539.352 34.8066 538.701 33.2949 537.4C31.7949 536.1 31.0449 534.383 31.0449 532.25H34.3145C34.3145 533.598 34.7539 534.676 35.6328 535.484C36.5117 536.293 37.6895 536.697 39.166 536.697C40.7363 536.697 41.9375 536.287 42.7695 535.467C43.6016 534.646 44.0176 533.469 44.0176 531.934C44.0176 530.445 43.5605 529.303 42.6465 528.506C41.7324 527.709 40.4141 527.299 38.6914 527.275H36.248V524.621Z" fill="#293241"/>
						<path d="M46.2891 299H29.5195V296.662L38.3789 286.818C39.6914 285.33 40.5938 284.123 41.0859 283.197C41.5898 282.26 41.8418 281.293 41.8418 280.297C41.8418 278.961 41.4375 277.865 40.6289 277.01C39.8203 276.154 38.7422 275.727 37.3945 275.727C35.7773 275.727 34.5176 276.189 33.6152 277.115C32.7246 278.029 32.2793 279.307 32.2793 280.947H29.0273C29.0273 278.592 29.7832 276.688 31.2949 275.234C32.8184 273.781 34.8516 273.055 37.3945 273.055C39.7734 273.055 41.6543 273.682 43.0371 274.936C44.4199 276.178 45.1113 277.836 45.1113 279.91C45.1113 282.43 43.5059 285.43 40.2949 288.91L33.4395 296.346H46.2891V299Z" fill="#293241"/>
						<path d="M43.207 49H39.9375V27.3262L33.3809 29.7344V26.7812L42.6973 23.2832H43.207V49Z" fill="#293241"/>
						<defs>
							<filter id="filter0_d" x="0" y="490" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix"/>
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
								<feOffset dy="4"/>
								<feGaussianBlur stdDeviation="2"/>
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
							</filter>
							<filter id="filter1_d" x="0" y="252" width="76" height="76" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix"/>
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
								<feOffset dy="4"/>
								<feGaussianBlur stdDeviation="2"/>
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
							</filter>
							<filter id="filter2_d" x="2" y="0" width="76" height="75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix"/>
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
								<feOffset dy="4"/>
								<feGaussianBlur stdDeviation="2"/>
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
							</filter>
						</defs>
					</svg>

				</div>
			</div>
			<div className="authContainer  center-align col l3 s12 m6 offset-m6">
				<span className="authTitle">Вход в личный кабинет</span>
				<input
					className="inputEmail yellow-input input-field white"
					placeholder="email"
					value={email}
					onChange={(event => {
						setEmail(event.target.value);
					})}
				/>
				<input
					className="inputPassword yellow-input input-field white"
					placeholder="password"
					type="password"
					value={password}
					onChange={(event => {
						setPassword(event.target.value);
					})}
				/>
				<div className="s12">
					<button
						className="loginButton waves-effect waves-light btn amber lighten-4 black-text"
						onClick={authHandler}
					>
						Войти
					</button>
					<button
						className="registrationButton waves-effect waves-light btn deep-orange lighten-3 black-text"
						onClick={goToRegister}
					>
						Зарегистрироваться
					</button>
				</div>
			</div>
		</div>
	);
}