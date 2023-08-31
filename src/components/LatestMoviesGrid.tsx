import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard'; // Import the MovieCard component

interface LatestMoviesListProps {
  movies: Array<{
    id: number;
    title: string;
    release_date: string;
    poster_path: string | 'null';
  }>;
}

const LatestMoviesList: React.FC<LatestMoviesListProps> = ({ movies }) => {
  return (
    <Container>
      <h1 className="mb-4">Best New Releases!</h1>
      <Row lg={5} md={5} sm={2} className="g-2">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LatestMoviesList;
