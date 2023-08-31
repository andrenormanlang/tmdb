import React from 'react';
import { Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null; // Make sure to include null in the type
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <RouterLink to={`/${movie.id}`} className="text-decoration-none">
      <Card className="movie-card">
        {movie.poster_path && ( // Conditionally render the image only when poster_path is available
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
        )}
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <div className='mt-1'>Release Date:</div>
          <div className="date-font-size release-date mt-2">{formattedReleaseDate}</div>
        </Card.Body>
      </Card>
    </RouterLink>
  );
};

export default MovieCard;
