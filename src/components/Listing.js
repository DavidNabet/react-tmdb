import { useContext } from "react";
import MovieContext from "../context/MovieContext";

const Listing = ({ movies }) => {
	const { searchData, setCurrMovie } = useContext(MovieContext);
	return (
		<div className="wrapper_movies-list">
			<ul className="wrapper_inner__movies-list">
				{movies.map((movie) => {
					return (
						<li className="item_list" key={movie.id}>
							<button onClick={() => setCurrMovie(movie.id)}>
								{movie.title}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Listing;
