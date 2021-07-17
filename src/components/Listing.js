import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/MovieContext";

const Listing = ({}) => {
	const { setCurrMovie, searchData, currMovie } = useContext(MovieContext);
	// const [selected, setSelected] = useState(0);

	return (
		<div className="wrapper_movies-list">
			<ul className="wrapper_inner__movies-list">
				{searchData.map((movie) => {
					// const title =
					// 	movie.id === selected ? (
					// 		<a href="#" style={{ color: "salmon" }}>
					// 			{movie.title}
					// 		</a>
					// 	) : (
					// 		<a href="#">{movie.title}</a>
					// 	);
					return (
						<li className="item_list" key={movie.id}>
							<i className="fas fa-angle-right"></i>
							<h3 onClick={(e) => setCurrMovie(movie.id)}>{movie.title}</h3>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Listing;
