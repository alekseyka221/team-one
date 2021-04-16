import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from './routes';
import './App.css'
import {Footer} from "./components/Footer";

function App()
{
	const routes = useRoutes(false);
	return (
		<div className="App">
			<Router>
				{routes}
			</Router>
			<Footer/>
		</div>
	);
}

export default App;
