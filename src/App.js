import { useState, useEffect } from "react";
// import movies from "./seed/movies.json";
// Packages
import axios from "axios";
// Context
import MovieContext from "./context/MovieContext";
// Components
import Search from "./components/Search";
import Listing from "./components/Listing";
import Details from "./components/Details";
import Loader from "./components/Loader";
import "./App.css";
import { fetchMovies, URL, API_KEY } from "./config";

function App() {
	// const [popularData, setPopularData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [searchNow, setSearchNow] = useState(false);

	const [searchData, setSearchData] = useState([]);
	const [currMovie, setCurrMovie] = useState(null);
	let endpoint;

	useEffect(() => {
		const fetchData = async () => {
			if (!searchTerm) {
				endpoint = await axios.get(`${URL}movie/popular?api_key=${API_KEY}`);
			} else {
				console.log("in else");
				endpoint = await axios.get(
					`${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`
				);
			}
			setSearchData(endpoint.data.results);
			setIsLoading(false);
		};
		fetchData();
	}, [searchNow, searchTerm]);

	return isLoading ? (
		<div>Chargement en cours</div>
	) : (
		<main>
			<MovieContext.Provider value={{ searchData, currMovie, setCurrMovie }}>
				<div className="container">
					<div className="container__half">
						<Search
							query={searchTerm}
							handleChange={(e) => {
								setSearchTerm(e.target.value);
								setSearchNow(!searchNow);
							}}
						/>
						<Listing movies={searchData} />
					</div>
					<div className="container__half">
						<Details movieId={currMovie} />
					</div>
				</div>
			</MovieContext.Provider>
		</main>
	);
}

export default App;
