import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../services/tmdbAPI';

const useFetchMovie = (id: number) => {
  return useQuery(['movie', id], () => getMovie(id));
};

export default useFetchMovie;
