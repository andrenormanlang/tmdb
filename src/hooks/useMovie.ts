import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../services/tmdbAPI';

const useMovie = (id: number) => {
  return useQuery(['movie', id], () => getMovie(id));
};

export default useMovie;
