import { Container } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";
import useUpcoming from "../hooks/useUpcoming";
import MoviesGridWithReleaseDate from "../components/MoviesGridWithReleaseDate";

const Upcoming = () => {
	const {
		data,
		isFetching,
		error,
		page,
		handlePreviousPage,
		handleNextPage,
	} = useUpcoming();

	if (isFetching) {
		return;
	}

	if (error) {
		return <p>Error fetching movies</p>;
	}

	const movieResults = data?.results ?? [];

	// Sort the movies by release date in descending order
	const sortedMovies = [...movieResults].sort(
		(a, b) =>
			Number(new Date(b.release_date)) - Number(new Date(a.release_date))
	);

	return (
		<Container>
			<h1 className="mb-4">Best Upcoming Movies!</h1>
			<MoviesGridWithReleaseDate movies={sortedMovies} />
			<CustomPagination
				page={page}
				totalPages={data?.total_pages}
				isFetching={isFetching}
				handlePreviousPage={handlePreviousPage}
				handleNextPage={handleNextPage}
			/>
		</Container>
	);
};

export default Upcoming;
