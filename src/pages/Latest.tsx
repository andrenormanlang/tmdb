import { useQuery } from '@tanstack/react-query';
import { getLatestCinemaMovies } from '../services/tmdbAPI';
import MoviesGridWithReleaseDate from '../components/MoviesGridWithReleaseDate';

const Latest = () => {
  const { data, isFetching, error } = useQuery(['latestCinemaMovies'], getLatestCinemaMovies);

  if (isFetching) {
    return 
  }

  if (error) {
    return <p>Error fetching movies</p>;
  }

  const movieResults = data?.results ?? [];

  // Sort the movies by release date in descending order
  const sortedMovies = [...movieResults].sort(
    (a, b) => Number(new Date(b.release_date)) - Number(new Date(a.release_date))
  );

  return(
		<>
			<h1 className="mb-4">New Releases!</h1>
			<MoviesGridWithReleaseDate movies={sortedMovies} />;
		</>

	)
};

export default Latest;
