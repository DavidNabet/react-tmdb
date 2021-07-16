const Search = ({ query, handleChange }) => {
	return (
		<div className="wrapper_search">
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search..."
			/>
			<i className="fas fa-search"></i>
		</div>
	);
};

export default Search;
