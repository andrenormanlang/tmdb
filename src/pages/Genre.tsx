import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre, getGenres } from "../services/tmdbAPI";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";

const Genre: React.FC = () => {
	const { genreId } = useParams<{ genreId?: string }>();
	const [page, setPage] = useState(
		parseInt(localStorage.getItem("currentPage") || "1")
	);

	useEffect(() => {
		// Update the page in local storage only when switching to a different genre
		if (localStorage.getItem("currentGenre") !== genreId) {
			setPage(1);
			localStorage.setItem("currentPage", "1");
			localStorage.setItem("currentGenre", genreId || "");
		}
	}, [genreId]);

	const { data: genreData } = useQuery(["genres"], getGenres);

	const {
		data: movies,
		error,
		isFetching,
	} = useQuery(
		["movies", genreId, page], // Include page in the query key
		() => getMoviesByGenre(parseInt(genreId ?? ""), page),
		{
			refetchOnWindowFocus: false,
		}
	);

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage((prevPage) => {
				const newPage = prevPage - 1;
				localStorage.setItem("currentPage", newPage.toString());
				return newPage;
			});
		}
	};

	const handleNextPage = () => {
		if (movies?.page && movies?.page < movies?.total_pages) {
			setPage((prevPage) => {
				const newPage = prevPage + 1;
				localStorage.setItem("currentPage", newPage.toString());
				return newPage;
			});
		}
	};

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
