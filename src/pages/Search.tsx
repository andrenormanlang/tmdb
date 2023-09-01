import { Container } from "react-bootstrap";
import useSearchResults from "../hooks/useSearchResults";
import MoviesGridWithReleaseDate from "../components/MoviesGridWithReleaseDate";
import CustomPagination from "../components/CustomPagination";

const SearchResults = () => {
	const {
		searchResults,
		error,
		isFetching,
		query,
		handlePreviousPage,
		handleNextPage,
	} = useSearchResults();

	if (isFetching) {
		return;
	}

	if (error) {
		return <div>Error fetching search results</div>;
	}

	const noResults =
		!searchResults?.results || searchResults?.results.length === 0;

	return (
		<Container>
			<h1 className="mb-4">Search Results for "{query}"</h1>

			{noResults ? (
				<p>No search results found for "{query}".</p>
			) : (
				<>
					<MoviesGridWithReleaseDate
						movies={searchResults?.results ?? []}
					/>

					<CustomPagination
						page={searchResults?.page}
						totalPages={searchResults?.total_pages}
						isFetching={isFetching}
						handlePreviousPage={handlePreviousPage}
						handleNextPage={handleNextPage}
					/>
				</>
			)}

			{isFetching && <div>.</div>}
		</Container>
	);
};

export default SearchResults;
