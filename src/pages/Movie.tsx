import { Col, Container, Row } from 'react-bootstrap';
import useMovieLS from '../hooks/useMovieAndLS';
import MovieInfo from '../components/Movie/MovieInfo';
import DirectorAndCast from '../components/Movie/DirectorAndCast';
import SimilarMovies from '../components/Movie/SimilarMovies';
import MovieHeader from '../components/Movie/MovieHeader';

const Movie: React.FC = () => {
  const { movieData, isFetching, error } = useMovieLS();

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching movie</p>;
  }

  return (
    <Container>
      {movieData && (
        <>
				<h1 className="mb-4">{movieData.title}</h1>
				<Row>
        <Col lg={4}>
				<MovieHeader movieData={movieData} />
				</Col>



				<Col lg={8}>
				<MovieInfo movieData={movieData} />
				</Col>
				<Col lg={8}>
				<DirectorAndCast movieData={movieData} />
				</Col>
				</Row>

				<Row>
				<Col lg={9}>
				<SimilarMovies movieData={movieData} />
				</Col>
				</Row>



        </>
      )}
    </Container>
  );
};

export default Movie;




