import { useQuery } from '@tanstack/react-query';
import { getLatestCinemaMovies } from '../services/tmdbAPI';
import LatestMoviesList from '../components/LatestMoviesGrid'; 

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

  return <LatestMoviesList movies={sortedMovies} />;
};

export default Latest;
