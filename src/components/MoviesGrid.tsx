import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { MovieType } from "../types/Movie.types";

interface Movies {
	movies: MovieType[];
}

const MoviesGrid: React.FC<Movies> = ({ movies }) => {
	return (
		<Container>
			<Row lg={5} md={5} sm={2} className="g-2">
				{movies.map((movie) => (
					<Col key={movie.id}>
						<RouterLink to={`/${movie.id}`} className="text-decoration-none">
							<Card className="movie-card">
								<Card.Img
									variant="top"
									src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
								/>
								<Card.Body>
									<Card.Title className="five-em">{movie.title}</Card.Title>
								</Card.Body>
							</Card>
						</RouterLink>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default MoviesGrid;
