import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";
import useGenre from "../hooks/useGenre";
import posterNotAvailable from "../assets/images/poster-not-available.svg";

const Genre = () => {
	const { genreId } = useParams<{ genreId?: string }>();
	const {
		genreData,
		movies,
		error,
		isFetching,
		handlePreviousPage,
		handleNextPage,
	} = useGenre(genreId || "");

	if (isFetching) {
		return;
	}
	if (error) {
		return <div>Error fetching movies</div>;
	}

	return (
		<Container>
			<h1 className="mb-4">
				Movies of Genre{" "}
				{genreData &&
					genreData.genres.find(
						(genre) => genre.id === parseInt(genreId || "")
					)?.name}
			</h1>
			<Row lg={5} md={5} sm={2} className="g-2">
				{movies?.results.map((movie) => (
					<Col key={movie.id}>
						<Link
							to={`/${movie.id}`}
							className="text-decoration-none"
						>
							<Card className="movie-card">
								{movie.poster_path ? (
									<Card.Img
										variant="top"
										src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
									/>
								) : (
									<Card.Img
										variant="top"
										src={posterNotAvailable}
									/>
								)}
								<Card.Body>
									<Card.Title>{movie.title}</Card.Title>
									<div className="card-text">
										{genreData &&
											movie.genre_ids.map((genreId) => {
												const genre =
													genreData.genres.find(
														(genre) =>
															genre.id === genreId
													);
												const genreClassName = `genre-badge genre-${genre?.name
													.toLowerCase()
													.replace(" ", "-")}`; // Use the genre class name
												return (
													genre && (
														<span
															key={genre.id}
															className={
																genreClassName
															}
														>
															{genre.name}
														</span>
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
