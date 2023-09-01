import { Col, Row, Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { MovieType } from '../../types/Movie.types';

interface SimilarMoviesProps {
  movieData: MovieType;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({
  movieData,
}) => {
  return (
		<>
      <h2>Similar Films</h2>
      <Row lg={5} md={4} sm={2}  className="g-4">
        {movieData.similar?.results.map((movie) => (
          <Col key={movie.id}>
            <Card className="movie-card">
              {movie.poster_path && (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                />
              )}
              <Card.Body>
                <Card.Title>
                  <RouterLink
                    to={`/${movie.id}`}
                    className="movie-title text-decoration-none"
                  >
                    {movie.title}
                  </RouterLink>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
		</>
  );
};

export default SimilarMovies;
