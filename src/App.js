import { useState, useEffect } from "react";
import movies from "./seed/movies.json";
// Packages
import axios from "axios";
// Components
import Search from "./components/Search";
import Listing from "./components/Listing";
import Details from "./components/Details";
import "./App.css";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(movies);
				setData(response.data.results);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	return isLoading ? (
		<div>Chargement en cours</div>
	) : (
		<main>
			<div className="container">
				<div className="wrapper_left">
					<Search />
					<Listing movies={data} />
				</div>
				<div className="wrapper_right">
					<Details />
				</div>
			</div>
		</main>
	);
}

export default App;
