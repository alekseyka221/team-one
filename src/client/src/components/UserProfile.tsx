import React from 'react';
import './UserProfile.css'
import '../index.css'

export const UserProfile = (props: any) => {
	return (
		<div className="col l12 userInfoContainer">
			<div className="col l2 m12 s12 offset-l1">
				<img src={props.photoLink || "https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
					 width="128px" height="128px" className="userProfilePicture"/>
			</div>
			<ul className="col l3 offset-l1 basicInfo">
				<li>Имя: {props.name || "Загрузка..."}</li>
				<li>Город: {props.city || "Загрузка..."}</li>
				<li>Email: {props.email || "Загрузка..."}</li>
				<li>Связаться: <a href={ "https://"+props.social}>{props.social}</a></li>
			</ul>
			<div className="col l3 offset-l1 interests">
				<h3 className="col l12">Интересы:</h3>
				{props.categories !== undefined ? props.categories.map( (c: string) =>  <div className="col l6">{c}</div>) : ""}
			</div>
		</div>
	)
}