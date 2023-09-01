import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCardWithReleaseDate from "./MovieCardWithReleaseDate";
import { MovieType } from "../types/Movie.types";

interface MoviesGridWithReleaseDateProps {
	movies: MovieType[];
}

const MoviesGridWithReleaseDate: React.FC<MoviesGridWithReleaseDateProps> = ({
	movies,
}) => {
	return (
		<Container>
			<Row lg={5} md={5} sm={2} className="g-2">
				{movies.map((movie) => (
					<Col key={movie.id}>
						<MovieCardWithReleaseDate movie={movie} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default MoviesGridWithReleaseDate;
