import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";
import useFetchGenreMovies from "../hooks/useFetchGenre";

const Genre = () => {
  const { genreId } = useParams<{ genreId?: string }>();

  // Use the custom hook to fetch genre-related data
  const {
    genreData,
    movies,
    error,
    isFetching,
    handlePreviousPage,
    handleNextPage
  } = useFetchGenreMovies(genreId || '');

	if (isFetching) {
    return <p>Loading...</p>;
  }
	if (error) {
		return <div>Error fetching movies</div>;
	}

	return (
		<Container>
			<h1 className="mb-4">
				Movies of Genre{" "}
				{genreData &&
					genreData.genres.find((genre) => genre.id === parseInt(genreId || ""))
						?.name}
			</h1>
			<Row lg={5} md={5} sm={2} className="g-2">
				{movies?.results.map((movie) => (
					<Col key={movie.id}>
						<Link to={`/${movie.id}`} className="text-decoration-none">
							<Card className="movie-card">
								<Card.Img
									variant="top"
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								/>
								<Card.Body>
									<Card.Title>{movie.title}</Card.Title>
									<div className="card-text">
										{genreData &&
											movie.genre_ids.map((genreId) => {
												const genre = genreData.genres.find(
													(genre) => genre.id === genreId
												);
												return (
													genre && (
														<div key={genre.id} className="mb-1">
															<Badge bg="secondary">{genre.name}</Badge>
														</div>
													)
												);
											})}
									</div>
								</Card.Body>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			<CustomPagination
        page={movies?.page}
        totalPages={movies?.total_pages}
        isFetching={isFetching}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
      {isFetching && <div>Loading...</div>}
    </Container>
	  );
	};

export default Genre;
