const Search = ({ query, handleChange }) => {
	return (
		<div className="wrapper_search">
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Chercher un film..."
			/>
		</div>
	);
};

export default Search;
