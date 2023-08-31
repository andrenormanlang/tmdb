import { Card } from 'react-bootstrap';
import { MovieType } from '../../types/Movie.types';

interface MovieHeaderProps {
  movieData: MovieType;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({ movieData }) => {
  return (
    <>


          <Card>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            />
          </Card>

    </>
  );
};

export default MovieHeader;
