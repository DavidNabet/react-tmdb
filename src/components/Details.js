import { useState, useEffect } from "react";
// Package
import axios from "axios";
// Context
import { useContext } from "react";
import MovieContext from "../context/MovieContext";
// Helper/Config
import {
	IMAGE_BASE_URL,
	POSTER_SIZE,
	URL,
	API_KEY,
	formatDate,
} from "../utils";

const Details = () => {
	const { data, currentMovie } = useContext(MovieContext);
	const [singleMovie, setSingleMovie] = useState({});
	// Affichage du détail d'un film par rapport à la requête sur la liste de films populaires
	const movie = data.find((el) => el.id === currentMovie);
	useEffect(() => {
		const fetchMovie = async () => {
			try {
				let newState = {};

				const response = await axios.get(
					`${URL}movie/${currentMovie}/credits?api_key=${API_KEY}&language=fr-FR`
				);

				const request = await axios.get(
					`${URL}movie/${currentMovie}?api_key=${API_KEY}&language=fr-FR`
				);

				const directors = response.data.crew.filter(
					(member) => member.job === "Director"
				);
				if (data.length === 0) {
					newState = {};
				} else {
					newState.genres = request.data.genres;
					newState.actors = response.data.cast;
					newState.detail = movie;
					newState.directors = directors;
				}
				// setIsLoading(false);
				if (response.status === 200 && request.status === 200) {
					setSingleMovie(newState);
				}
			} catch (error) {
				console.error(error.message);
			}
		};
		fetchMovie();
	}, [currentMovie, movie, data]);

	return (
		<div className="wrapper_movie-details">
			<>
				<div className="wrapper__inner-top">
					{/* Image */}
					<div className="inner__top-image">
						<img
							src={
								singleMovie.detail?.poster_path
									? `${IMAGE_BASE_URL}${POSTER_SIZE}${singleMovie.detail?.poster_path}`
									: "./images/no_image.jpg"
							}
							alt={singleMovie.detail?.title}
						/>
					</div>
					{/* Title */}
					<div className="inner__top-infos">
						<h1>{singleMovie.detail?.title}</h1>
						{/* Date de sortie */}
						<div className="infos-date">
							<h3>Date de sortie</h3>
							<span>{formatDate(singleMovie.detail?.release_date)}</span>
						</div>
						{/* Score */}
						<div className="infos-rating">
							<meter
								min="0"
								max="100"
								optimum="100"
								low="40"
								high="70"
								value={String(singleMovie.detail?.vote_average * 10)}
							/>
							<span>{`${singleMovie.detail?.vote_average} / 10`}</span>
						</div>
						{/* Director */}
						<div className="infos-directors">
							{singleMovie.directors?.length > 1 ? (
								<h3>DIRECTEURS</h3>
							) : (
								<h3>DIRECTEUR</h3>
							)}
							{singleMovie.directors?.map((el, i) => {
								return (
									<p key={i} className="infos-director">
										{el.name}
									</p>
								);
							})}
						</div>
						{/* Genres */}
						<div className="infos-genres">
							<h3>GENRE(S)</h3>
							<div className="genre">
								{singleMovie.genres?.map(({ id, name }) => {
									return <span key={id}>{name}</span>;
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="wrapper__inner-bottom">
					<p>{singleMovie?.detail?.overview}</p>
					<h3>ACTEUR(S)</h3>
					<div className="inner__bottom-actors">
						{singleMovie?.actors?.map((actor, i) => {
							return (
								<div className="card-actor" key={i}>
									<span>
										<img
											src={
												actor?.profile_path
													? `${IMAGE_BASE_URL}original${actor?.profile_path}`
													: "./images/no_image.jpg"
											}
											alt={actor?.character}
										/>
									</span>
									<p className="actor-name">{actor?.name}</p>
									<p className="actor-character">{actor?.character}</p>
								</div>
							);
						})}
					</div>
				</div>
			</>
		</div>
	);
};

export default Details;
