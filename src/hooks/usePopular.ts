
import { useQuery } from "@tanstack/react-query";
import { getMostPopularMovies } from "../services/tmdbAPI";

const usePopular = () => {
  const { data, isFetching, error } = useQuery(
    ["mostPopularMovies"],
    getMostPopularMovies
  );

  return { data, isFetching, error };
};

export default usePopular;
