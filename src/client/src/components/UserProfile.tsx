import React from 'react';
import './UserProfile.css'
import '../index.css'

export const UserProfile = (props: any) => {
	return (
		<div className="col l12 userInfoContainer">
			<div className="col l2 m12 s12 offset-l1">
				<img src="https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
					 width="128px" height="128px" className="userProfilePicture"/>
			</div>
			<ul className="col l3 offset-l1 basicInfo">
				<li>{props.username || "Загрузка..."}</li>
				<li>{props.name || "Загрузка..."}</li>
				<li>{props.city || "Загрузка..."}</li>
			</ul>
			<div className="col l3 offset-l1 interests">
				<div className="col l12 infoUnderlined">Интересы:</div>
				<div className="col l6">Психология</div>
				<div className="col l6">Детективы</div>
				<div className="col l6">Романы</div>
				<div className="col l6">Наука</div>
			</div>
		</div>
	)
}