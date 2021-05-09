import React from 'react';
import './BookItem.css'

export const BookItem = () => {
	return (
		<div className="col l4 m6 s12 center-align bookItem ">
			<div className="bookItemContent">
				<img src="https://hsto.org/files/22b/18c/e70/22b18ce70e474e7c961da7540a90be97.jpg"
					 height="200px" width="100%"/>
				<p>Очень крутая книга</p>
			</div>
		</div>
	)
}