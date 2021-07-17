import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import { IMAGE_BASE_URL, POSTER_SIZE, URL, API_KEY } from "../config";

const Details = () => {
	// console.log("SINGLE MOVIE ", movie);
	// const [isLoading, setIsLoading] = useState(true);
	const [singleMovie, setSingleMovie] = useState({});
	const { searchData, currMovie } = useContext(MovieContext);
	const movie = searchData.find((el) => el.id === currMovie);
	useEffect(() => {
		const fetchMovie = async () => {
			try {
				let newState = {};

				const response = await axios.get(
					`${URL}movie/${currMovie}/credits?api_key=${API_KEY}`
				);

				const request = await axios.get(
					`${URL}movie/${currMovie}?api_key=${API_KEY}`
				);

				const directors = response.data.crew.filter(
					(member) => member.job === "Director"
				);
				if (searchData.length === 0) {
					newState = {};
				} else {
					newState.genres = request.data.genres;
					newState.actors = response.data.cast;
					newState.detail = movie;
					newState.directors = directors;
				}
				// setIsLoading(false);
				setSingleMovie(newState);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchMovie();
	}, [currMovie, movie, searchData]);

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
							<span>{singleMovie.detail?.release_date}</span>
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
							<span className="infos-score">
								{`${singleMovie.detail?.vote_average} / 10`}
							</span>
						</div>
						{/* Director */}
						<div className="infos-directors">
							{singleMovie.directors?.length > 1 ? (
								<h3>DIRECTORS</h3>
							) : (
								<h3>DIRECTOR</h3>
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
							<h3>GENRES</h3>
							{singleMovie.genres?.map((genre) => {
								return <span>{genre.name}</span>;
							})}
						</div>
					</div>
				</div>
				<div className="wrapper__inner-bottom">
					<p>{singleMovie?.detail?.overview}</p>
					<h3>ACTORS</h3>
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
