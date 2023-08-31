import { useQuery } from '@tanstack/react-query';
import { getLatestCinemaMovies } from '../services/tmdbAPI';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

const Latest = () => {
  const { data, isFetching, error } = useQuery(['latestCinemaMovies'], getLatestCinemaMovies);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching movies</p>;
  }

  const movieResults = data?.results ?? [];




  // Sort the movies by release date in descending order
  const sortedMovies = [...movieResults].sort(
    (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
  );

  return (
    <Container>
      <h1 className="mb-4">Best New Releases!</h1>
      <Row lg={5} md={5} sm={2} className="g-2">
        {sortedMovies.map((movie) => {
          const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          });
          return (
            <Col key={movie.id}>
              <RouterLink to={`/${movie.id}`} className="text-decoration-none">
                <Card className="movie-card">
                  <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
										<div className='mt-1'>Release Date:</div>
                    <div className="date-font-size release-date mt-2">{formattedReleaseDate}</div>
                  </Card.Body>
                </Card>
              </RouterLink>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Latest;

