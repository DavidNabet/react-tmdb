import { useContext } from "react";
import MovieContext from "../context/MovieContext";

const Listing = ({ movies }) => {
	const { setCurrMovie } = useContext(MovieContext);
	return (
		<div className="wrapper_movies-list">
			<ul className="wrapper_inner__movies-list">
				{movies.map((movie) => {
					return (
						<li className="item_list" key={movie.id}>
							<i className="fas fa-angle-right"></i>
							<h3 onClick={() => setCurrMovie(movie.id)}>{movie.title}</h3>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Listing;
