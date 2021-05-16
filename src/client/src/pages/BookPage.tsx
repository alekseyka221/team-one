import React, {useContext, useEffect, useState} from 'react';
import './css/BookPage.css';
import {AuthContext} from "../context/AuthContext";
import {useLocation} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {store} from "react-notifications-component";

export const BookPage = (props: any) => {
	const location = useLocation();
	const auth = useContext(AuthContext)
	const {loading, request, error, clearError} = useHttp()
	// @ts-ignore
	const params = location.state
	// @ts-ignore
	const title: string = params.title
	// @ts-ignore
	const author: string = params.author
	// @ts-ignore
	const publishedIn: number = params.publishedIn
	// @ts-ignore
	const genre: string = params.genre
	// @ts-ignore
	const cover: string = params.photoLink || "https://i.imgur.com/2PBaZPK.png"
	// @ts-ignore
	const quality: number = params.quality
	// @ts-ignore
	const exchangeType: string = params.exchangeType
	// @ts-ignore
	const bookOwner: string = params.bookOwner
	// @ts-ignore
	const bookId: string = params._id

	const [bookOwnerInfo, setBookOwnerInfo]: any = useState({});

	useEffect(() => {
		(async function() {
			const data = await request('/user/anotherShort', 'POST', {
				token: auth.token,
				userId: auth.userId,
				bookOwnerId: bookOwner
			})
			console.log(data["bookOwner"])
			setBookOwnerInfo(data["bookOwner"])
		})()
	}, [])

	const qualities: any = [
		"Плохое",
		"Не очень",
		"Среднее",
		"Прочитана один раз",
		"Новая"
	]

	const changeStatusHandler = () => {
		(async function() {
			try
			{
				const data = await request('/user/changeStatusBook', 'POST', {
					token: auth.token,
					userId: auth.userId,
					bookId: bookId
				})
				store.addNotification(notifications["success"])
			}
			catch (e)
			{
				store.addNotification(notifications["error"])
			}
		})()
	}

	const notifications = {
		success: {
			title: "Успех!",
			message: "Успешно изменен статус",
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
		error: {
			title: "Ошибка!!",
			message: "Не удалось изменить статус",
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
		}
	}

	return (
		<div id="BookPage" className="row l12 m12 s12">
			<div className="Book row col l5 offset-l1 m12">
				<div className="leftSideBook center-align center center-block row col l6">
					<div className="center-align center col l12">
						<img className="bookImage" src={cover}/>
					</div>
					<p className="col l12 center-align">{genre}</p>
				</div>
				<div className="row col l6">
					<h3 className="col l12 center">{title}</h3>
					<h5 className="col l6 right right-align right-aligned">{author}</h5>
					<h6 className="col 12 right right-align right-aligned">Опубликована в {publishedIn} году</h6>
				</div>
			</div>
			<div className="Owner row col  l3 offset-l1 m12">
				<div className="col l12">
					<h6
							className="bookOwnerText col l6"
							style={{display: "inline-block"}}>Владелец книги:
					</h6>
					<div className="userProfileRight row col l6">
						<img
								className="userImage col l12"
								style={{verticalAlign: "middle"}}
								src={bookOwnerInfo['photoLink'] || "https://sun9-55.userapi.com/impf/c845523/v845523755/de8d8/Qmwxmr1gzCQ.jpg?size=2560x2048&quality=96&sign=04a387e35d66e79dd00c8be0e246ed40&type=album"}
								height="128px"
						/>
						<h6 className="col l12">{ bookOwnerInfo['name'] }</h6>
					</div>
				</div>
					<span className="userInfoSPan col l12">{qualities[quality] && "Качество книги: " + qualities[quality]}</span>
					<span className="userInfoSPan col l12">Хочет {exchangeType == "barter" ? "обменять" : "отдать бесплатно"} </span>
					<span className="userInfoSPan col l12">{bookOwnerInfo["city"] && "Проживает в городе " + bookOwnerInfo["city"]} </span>
					<span className="userInfoSPan col l12">{bookOwnerInfo["social"] && "Связаться:" + bookOwnerInfo["social"]}</span>
					<span className="userInfoSPan col l12">{bookOwnerInfo["email"]}</span>
					{auth.userId === bookOwner && <a onClick={changeStatusHandler} className="btn center waves-effect red lighten-1">Переместить книгу в обмененные</a>}
			</div>
		</div>
	);
}