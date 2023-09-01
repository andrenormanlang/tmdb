import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../services/tmdbAPI";

const useMovieLS = () => {
	const { id } = useParams<{ id: string }>();

	// Fetch movie data using react-query
	const {
		data: movieData,
		isFetching,
		error,
	} = useQuery(["movie", id], () => getMovie(Number(id)));

	// Update recently viewed movies in local storage
	useEffect(() => {
		if (movieData) {
			const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
			let recentlyViewed = storedRecentlyViewed
				? JSON.parse(storedRecentlyViewed)
				: [];

			recentlyViewed = recentlyViewed.filter(
				(viewedMovie: { id: number }) => viewedMovie.id !== movieData.id
			);
			recentlyViewed.unshift(movieData);

			if (recentlyViewed.length > 10) {
				recentlyViewed.pop();
			}

			localStorage.setItem(
				"recentlyViewed",
				JSON.stringify(recentlyViewed)
			);
		}
	}, [movieData]);

	return {
		movieData,
		isFetching,
		error,
	};
};

export default useMovieLS;
