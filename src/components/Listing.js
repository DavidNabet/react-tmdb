// Context
import { useContext } from "react";
import MovieContext from "../context/MovieContext";

const Listing = ({}) => {
	const { setCurrentMovie, data } = useContext(MovieContext);
	return (
		<div className="wrapper_movies-list">
			<ul className="wrapper_inner__movies-list">
				{/* Liste des films recherchés ou des films populaires */}
				{data.map(({ id, title }) => {
					return (
						<li className="item_list" key={id}>
							<i className="fas fa-angle-right"></i>
							<h3
								onClick={(e) => {
									e.preventDefault();
									setCurrentMovie(id);
								}}
							>
								{title}
							</h3>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Listing;
