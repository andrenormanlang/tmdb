import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByGenre, getGenres } from "../services/tmdbAPI";
import { Movies, Genres } from "../types/tmdb.types";

const useGenre = (genreId: string) => {
	const [page, setPage] = useState<number>(
		parseInt(localStorage.getItem("currentPage") || "1")
	);

	useEffect(() => {
		// Update the page in local storage only when switching to a different genre
		if (localStorage.getItem("currentGenre") !== genreId) {
			setPage(1);
			localStorage.setItem("currentPage", "1");
			localStorage.setItem("currentGenre", genreId || "");
		}
	}, [genreId]);

	const { data: genreData } = useQuery<Genres>(["genres"], getGenres);

	const {
		data: movies,
		error,
		isFetching,
	} = useQuery<Movies>(
		["movies", genreId, page],
		() => getMoviesByGenre(parseInt(genreId ?? ""), page),
		{
			refetchOnWindowFocus: false,
		}
	);

	const handlePreviousPage = () => {
		if (page > 1) {
			setPage((prevPage) => {
				const newPage = prevPage - 1;
				localStorage.setItem("currentPage", newPage.toString());
				return newPage;
			});
		}
	};

	const handleNextPage = () => {
		if (movies?.page && movies?.page < movies?.total_pages) {
			setPage((prevPage) => {
				const newPage = prevPage + 1;
				localStorage.setItem("currentPage", newPage.toString());
				return newPage;
			});
		}
	};

	return {
		genreData,
		movies,
		error,
		isFetching,
		page,
		totalPages: movies?.total_pages,
		handlePreviousPage,
		handleNextPage,
	};
};

export default useGenre;
