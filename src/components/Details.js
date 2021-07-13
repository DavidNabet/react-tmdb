import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";

const Details = ({ movieId }) => {
	const { searchData, currMovie } = useContext(MovieContext);
	const movie = searchData.find((el) => el.id === currMovie);
	console.log("SINGLE MOVIE ", movie);
	console.log("Current Id ", movieId);
	return (
		<div className="wrapper_movie-details">
			<div className="wrapper__inner-top">
				<div>Details 1</div>
				<h2>{movie?.title}</h2>
			</div>
			<div className="wrapper__inner-bottom">
				<p>Paragraphe Details</p>
			</div>
		</div>
	);
};

export default Details;
