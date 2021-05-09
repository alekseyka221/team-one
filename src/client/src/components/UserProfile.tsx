import React from 'react';
import './UserProfile.css'

export const UserProfile = () => {
	return (
		<div className="col l12  brown lighten-3">
			<div className="col l2 m12 s12 offset-l1">
				<img src="https://st.depositphotos.com/1779253/5140/v/950/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
					 width="128px" height="128px" className="userProfilePicture"/>
			</div>
			<ul className="col l3 offset-l1">
				<li>Nickname</li>
				<li>Наруто Узумакович</li>
				<li>Конохагакуре</li>
				<li>Книг на обмене: 69</li>
			</ul>
			<div className="col l3 offset-l1">
				<h5 className="col l12">Интересы:</h5>
				<div className="col l6">Психология</div>
				<div className="col l6">Детективы</div>
				<div className="col l6">Романы</div>
				<div className="col l6">Наука</div>
			</div>
		</div>
	)
}