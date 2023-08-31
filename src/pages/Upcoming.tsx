import { useQuery } from '@tanstack/react-query';
import { getUpcomingCinemaMovies } from '../services/tmdbAPI';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import CustomPagination from '../components/CustomPagination';

const Upcoming = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || '1';
  const navigate = useNavigate();

  const { data, isFetching, error } = useQuery(
    ['UpcomingCinemaMovies', page],
    () => getUpcomingCinemaMovies(parseInt(page)),
  );

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

  const handlePreviousPage = () => {
    if (parseInt(page) > 1) {
      const newPage = (parseInt(page) - 1).toString();
      queryParams.set('page', newPage);
      navigate(`?${queryParams.toString()}`);
    }
  };

  const handleNextPage = () => {
    if (data?.page && data?.page < data?.total_pages) {
      const newPage = (parseInt(page) + 1).toString();
      queryParams.set('page', newPage);
      navigate(`?${queryParams.toString()}`);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Best Upcoming Movies!</h1>
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
      <CustomPagination
        page={parseInt(page)}
        totalPages={data?.total_pages}
        isFetching={isFetching}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </Container>
  );
}

export default Upcoming;


