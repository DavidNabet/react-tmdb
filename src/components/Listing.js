const ListItem = ({ movie }) => {
	return <li className="item_list">{movie.title}</li>;
};

const Listing = ({ movies }) => {
	return (
		<div>
			<ul className="movies-list">
				{movies.map((movie) => {
					return <ListItem movie={movie} key={movie.id} />;
				})}
			</ul>
		</div>
	);
};

export default Listing;
