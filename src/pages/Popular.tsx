import { useQuery } from '@tanstack/react-query';
import { getMostPopularMovies } from '../services/tmdbAPI';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

const Popular = () => {
  const { data, isFetching, error } = useQuery(['mostPopularMovies'], getMostPopularMovies);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching movies</p>;
  }

  // Use optional chaining and nullish coalescing to handle undefined data
  const movieResults = data?.results ?? [];

  return (
    <Container>
      <h1 className="mb-4">Most Popular Movies!</h1>
      <Row lg={5} md={5} sm={2} className="g-2">
        {movieResults.map((movie) => (
          <Col key={movie.id}>
            <RouterLink to={`/${movie.id}`} className="text-decoration-none">
              <Card className="movie-card">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                <Card.Body>
                  <Card.Title className='five-em'>{movie.title}</Card.Title>
                  {/* <Card.Text>{movie.overview}</Card.Text> */}
                </Card.Body>
              </Card>
            </RouterLink>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Popular;
