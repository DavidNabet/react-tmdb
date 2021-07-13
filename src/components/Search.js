const Search = ({ query, handleChange }) => {
	return (
		<div className="wrapper_search">
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search..."
			/>
		</div>
	);
};

export default Search;
