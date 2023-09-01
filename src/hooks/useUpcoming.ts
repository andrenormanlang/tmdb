import { useQuery } from "@tanstack/react-query";
import { getUpcomingCinemaMovies } from "../services/tmdbAPI";
import { useLocation, useNavigate } from "react-router-dom";

const useUpcoming = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const page = queryParams.get("page") || "1";
	const navigate = useNavigate();

	const { data, isFetching, error } = useQuery(
		["UpcomingCinemaMovies", page],
		() => getUpcomingCinemaMovies(parseInt(page))
	);

	const handlePreviousPage = () => {
		if (parseInt(page) > 1) {
			const newPage = (parseInt(page) - 1).toString();
			queryParams.set("page", newPage);
			navigate(`?${queryParams.toString()}`);
		}
	};

	const handleNextPage = () => {
		if (data?.page && data?.page < data?.total_pages) {
			const newPage = (parseInt(page) + 1).toString();
			queryParams.set("page", newPage);
			navigate(`?${queryParams.toString()}`);
		}
	};

	return {
		data,
		isFetching,
		error,
		page: parseInt(page),
		handlePreviousPage,
		handleNextPage,
	};
};

export default useUpcoming;
