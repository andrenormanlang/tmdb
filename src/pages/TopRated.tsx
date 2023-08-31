import { useQuery } from '@tanstack/react-query';
import { getTopRatedMovies } from '../services/tmdbAPI';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

const TopRated = () => {
  const { data, isFetching, error } = useQuery(['topRatedMovies'], getTopRatedMovies);

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
      <h1 className="mb-4">Top Rated Movies!</h1>
      <Row lg={4} md={4} sm={2} className="g-2">
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


export default TopRated;
