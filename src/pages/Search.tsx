import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSearchResults from "../hooks/useSearchResults";
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
    return <p>Loading...</p>;
  }

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
};

export default SearchResults;
