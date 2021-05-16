import React, {useContext, useEffect, useState} from 'react';
import './css/UploadPage.css';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import Select from "react-select";
import {store} from "react-notifications-component";

export const UploadPage = () => {
	const auth = useContext(AuthContext)

	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre]: any = useState("");
	const [publishedIn, setPublishedIn] = useState("");
	const [quality, setQuality] = useState("1");
	const [exchangeType, setExchangeType] = useState("free");
	const [image, setImage] = useState("");

	const {loading, request, error, clearError} = useHttp()

	useEffect(() => {
		console.log(genre["value"])
	}, [genre])

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

	const handleSubmission = async () => {
		try
		{
			const data = await request('/book/add', 'POST', {
				token: auth.token,
				userId: auth.userId,
				title: title,
				author: author,
				genre: genre["value"],
				quality: quality,
				publishedIn: publishedIn,
				exchangeType: exchangeType,
				photoLink: image
			})
			store.addNotification(notifications["success"])
		}
		catch (e)
		{
			console.log(e);
			store.addNotification(notifications["error"])
		}

	};

	const notifications = {
		error: {
			title: "Ошибка!",
			message: "Не удалось добавить книгу",
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
		success: {
			title: "Успех",
			message: "Книга успешно добавлена",
			type: "success" as "success",
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
		<div id="UploadPage" className="row l12 m12 s12">
			<div className="uploadForm center container row">
				<div className="bookInfo col l6">
					<label className="reg-container__label">
						<span className="label__description">Название книги</span>
						<input
							required
							className="yellow-input input-field white"
							placeholder="Название книги"
							value={title}
							onChange={(event => {
								setTitle(event.target.value);
							})}
						/>
					</label>
					<label className="reg-container__label">
						<span className="label__description">Автор</span>
						<input
							required
							className="yellow-input input-field white"
							placeholder="Автор"
							value={author}
							onChange={(event => {
								setAuthor(event.target.value);
							})}
						/>
					</label>
					<label className="reg-container__label">
						<span className="label__description">Жанр</span>
						<Select
							onChange={setGenre}
							className="basic-multi-select"
							classNamePrefix="select"
							options={options}
						/>
					</label>
					<label className="reg-container__label">
						<span className="label__description">Год публикации</span>
						<input
							className="yellow-input input-field white"
							placeholder="год публикации"
							value={publishedIn}
							onChange={(event => {
								setPublishedIn(event.target.value);
							})}
						/>
					</label>
				</div>

				<div className="itemInfo col l6">
					<label className="reg-container__label">
						<span className="label__description">Состояние книги</span>
						<select style={{display: "block"}} value={quality}
								onChange={(event => {
									setQuality(event.target.value);
								})}
						>
							<option value="1">Плохое</option>
							<option value="2">Не очень</option>
							<option value="3" selected>Среднее</option>
							<option value="4">Прочитана один раз</option>
							<option value="5">Новая</option>
						</select>
					</label>

					<label className="reg-container__label">
						<span className="label__description">Тип обмена</span>
						<select style={{display: "block"}} value={exchangeType}
								onChange={(event => {
									setExchangeType(event.target.value);
								})}
						>
							<option value="free" selected>Безвозмездно</option>
							<option value="barter">Бартер</option>
						</select>
					</label>

					<label className="reg-container__label">
						<span className="label__description">Ссылка на изображение</span>
						<div className="file-field input-field">
								<input
									className="yellow-input input-field white"
									placeholder="Изображение"
									value={image}
									onChange={(event => {
										setImage(event.target.value);
									})}
								/>
						</div>
					</label>
				</div>
				<a className="submitButton btn waves-effect brown lighten-1" onClick={handleSubmission}>Отправить</a>
			</div>
		</div>
	);
}