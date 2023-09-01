import MoviesGrid from "../components/MoviesGrid";

const Last10Visits = () => {
	const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
	const recentlyViewed = storedRecentlyViewed
		? JSON.parse(storedRecentlyViewed)
		: [];

	return (
		<div>
			<h1>Last 10 Visits</h1>
			<MoviesGrid movies={recentlyViewed} />
		</div>
	);
};

export default Last10Visits;
