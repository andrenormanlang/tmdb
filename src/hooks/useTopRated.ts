import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../services/tmdbAPI";

const useTopRated = (page: number) => {
  const { data, isFetching, error } = useQuery(
    ["topRatedMovies", page],
    () => getTopRatedMovies(page) 
  );

  return { data, isFetching, error };
};

export default useTopRated;
