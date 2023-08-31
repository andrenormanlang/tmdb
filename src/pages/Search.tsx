import { useLocation, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/tmdbAPI";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";

function SearchResults() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get("query");
	const page = queryParams.get("page") || "1";
	const navigate = useNavigate();

	const {
		data: searchResults,
		error,
		isFetching,
	} = useQuery(
		["search", query, page], // Include page in the query key
		() => searchMovies(query || "", parseInt(page)),
		{
			refetchOnWindowFocus: false,
		}
	);

	const handlePreviousPage = () => {
		if (parseInt(page) > 1) {
			const newPage = (parseInt(page) - 1).toString();
			queryParams.set("page", newPage);
			navigate(`?${queryParams.toString()}`);
		}
	};

	const handleNextPage = () => {
		if (
			searchResults?.page &&
			searchResults?.page < searchResults?.total_pages
		) {
			const newPage = (parseInt(page) + 1).toString();
			queryParams.set("page", newPage);
			navigate(`?${queryParams.toString()}`);
		}
	};

	if (error) {
		return <div>Error fetching search results</div>;
	}

	const sortedResults = searchResults?.results.sort((a, b) => {
    // Sort movies in descending order by release date (recent to older)
    return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
  });

	return (
		<Container>
			<h1 className="mb-4">Search Results for "{query}"</h1>
			<Row lg={5} md={5} sm={2} className="g-2">
				{sortedResults?.map((result) => (

					<Col key={result.id}>
						<Link to={`/${result.id}`} className="text-decoration-none">
							<Card className="movie-card">
								<Card.Img
									variant="top"
									src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
								/>
								<Card.Body>
									<Card.Title>{result.title}</Card.Title>
									{/* ... other details ... */}
								</Card.Body>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			<CustomPagination
				page={searchResults?.page}
				totalPages={searchResults?.total_pages}
				isFetching={isFetching}
				handlePreviousPage={handlePreviousPage}
				handleNextPage={handleNextPage}
			/>
			{isFetching && <div>Loading...</div>}
		</Container>
	);
}

export default SearchResults;
