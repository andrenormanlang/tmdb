import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/tmdbAPI";

const useSearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const page = queryParams.get("page") || "1";
  const navigate = useNavigate();

  const {
    data: searchResults,
    error,
    isFetching,
  } = useQuery(
    ["search", query, page], // Include page in the query key
    () => searchMovies(query || "", parseInt(page)),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handlePreviousPage = () => {
    if (parseInt(page) > 1) {
      const newPage = (parseInt(page) - 1).toString();
      queryParams.set("page", newPage);
      navigate(`?${queryParams.toString()}`);
    }
  };

  const handleNextPage = () => {
    if (
      searchResults?.page &&
      searchResults?.page < searchResults?.total_pages
    ) {
      const newPage = (parseInt(page) + 1).toString();
      queryParams.set("page", newPage);
      navigate(`?${queryParams.toString()}`);
    }
  };

  return {
    searchResults,
    error,
    isFetching,
    handlePreviousPage,
    handleNextPage,
		query
  };
};

export default useSearchResults;
