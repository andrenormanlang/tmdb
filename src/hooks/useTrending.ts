import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTrendingMovies } from "../services/tmdbAPI";

export const useTrending = (initialTimeWindow: string) => {
  const queryClient = useQueryClient();

  const fetchTrendingMovies = async (timeWindow: string) => {
    const data = await getTrendingMovies(timeWindow);
    return data.results;
  };

  const { data, error, isFetching } = useQuery(
    ["trending", initialTimeWindow],
    () => fetchTrendingMovies(initialTimeWindow)
  );

  const toggleTimeWindow = () => {
    const newTimeWindow = initialTimeWindow === "day" ? "week" : "day";
    // Refetch data with the new time window
    queryClient.refetchQueries(["trending", newTimeWindow]);
  };

  return {
    trendingMovies: data,
    isFetching,
    error,
    toggleTimeWindow,
  };
};

export default useTrending
