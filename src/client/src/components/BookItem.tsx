import React from 'react';
import './BookItem.css'
import {Link} from 'react-router-dom'

export const BookItem = (props: any) => {
	return (
		<Link to={{
			pathname: `/book/`+props.title,
			state: {
				...props
			}
		}}>
			<div key={props._id} className="row col l4 m6 s12 center-align bookItem  ">
				<div className="bookItemContent l12 red lighten-4">
					<img	style={{opacity: (props["status"] === "open" ? "1" : 0.5)}}
							src={props.photoLink || "https://hsto.org/files/22b/18c/e70/22b18ce70e474e7c961da7540a90be97.jpg"}
						 	height="300px"/>
					<span className="bookTitle">{props.title || "Очень крутая книга"}</span>
				</div>
			</div>
		</Link>

	)
}