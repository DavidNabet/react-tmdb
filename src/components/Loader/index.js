import LoaderSrc from "../../assets/loader.svg";
import "./loader.css";
const Loader = () => {
	return (
		<div className="loading-state">
			<img style={{ width: 70 }} alt="Loader icon" src={LoaderSrc} />
			<span className="loading-state--text">Loading...</span>
		</div>
	);
};

export default Loader;
