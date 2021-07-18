export const URL = "https://api.themoviedb.org/3/";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// w92, w154, w185, w342, w500, w780, original
export const POSTER_SIZE = "w185";

export const API_KEY = "37012dd5f665f158bde0e455b8c83ea4";

export const formatDate = (n) => {
	const date = new Date(n);

	if (!n) return "Aucune date de sortie prévue";

	return (
		(date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
		"/" +
		(date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
		"/" +
		date.getFullYear()
	);
};
