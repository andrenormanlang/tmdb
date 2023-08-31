import { MovieType } from '../../types/Movie.types';

interface MovieInfoProps {
  movieData: MovieType;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieData }) => {
  return (
		<>
			<h2>Overview</h2>
      <p>{movieData.overview}</p>
      <h2>Release Date</h2>
      <p>
        {new Date(movieData.release_date).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })}
      </p>
		</>


  );
};

export default MovieInfo;
