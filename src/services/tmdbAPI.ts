/**
 * Service for communicating with The Movie Database (TMDB) API
 */
import axios from "axios";
import { MovieType } from "../types/Movie.types";
import { Genres, Movies } from "../types/tmdb.types";
import { Credits } from "../types/Movie.types";
import { Actor } from "../types/Actor.type";
import { CrewCredit } from "../types/Movie.types";

const BASE_URL = "https://api.themoviedb.org/3";
const VITE_ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		Authorization: "Bearer " + VITE_ACCESS_TOKEN,
		Accept: "application/json",
	},
	params: {
		// include_adult: "false",
		region: "US",
		language: "en-US",
	},
});
/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise<T>
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint);
	return response.data;
};

/**
 * Get the 10-20 latest cinema films
 */
export const getLatestCinemaMovies = () => {
	return get<Movies>(`/movie/now_playing?`);
};

/**
 * Get the 10-20 latest cinema films
 */
export const getUpcomingCinemaMovies = (page: number) => {
	return get<Movies>(`/movie/upcoming?&page=${page}`);
};

/**
 * Get the 10-20 most popular movies
 */
export const getMostPopularMovies = () => {
	return get<Movies>(`/movie/popular?`);
};

/**
 * Get the 10-20 most top rated movies
 */
export const getTopRatedMovies = (page: number) => {
	return get<Movies>(`/movie/top_rated?page=${page}`);
};

/**
 * Get genres
 *
 */
export const getGenres = () => {
	return get<Genres>(`genre/movie/list`);
};

/**
 * Get movies by genre
 *
 * @param {number} genreId Genre ID
 * @returns Promise<Movies>
 */
export const getMoviesByGenre = (genreId: number, page: number) => {
	return get<Movies>(`/discover/movie?with_genres=${genreId}&page=${page}`);
};

/**
 * Get movie by id
 */
export const getMovie = (id: number) => {
	return get<MovieType>(`/movie/${id}?&append_to_response=credits,similar`);
};

/**
 * Get actor by id
 */
export const getActor = (id: number) => {
	return get<Actor>(`/person/${id}`);
};

/**
 * Get credits of an actor by id
 */
export const getActorCredits = (id: number) => {
	return get<Credits>(`/person/${id}/movie_credits`);
};

/**
 * Get Director by id
 */
export const getDirector = (id: number) => {
	return get<CrewCredit>(`/person/${id}`);
};

/**
 * Get credits of an director by id
 */
export const getDirectorCredits = (id: number) => {
	return get<Credits>(`/person/${id}/movie_credits`);
};

/**
 * Search movies
 */
export const searchMovies = (query: string, page: number) => {
	return get<Movies>(`/search/movie?query=${query}&page=${page}`);
};

/**
 * Get movies trending in the day and week ranges
 */
export const getTrendingMovies = (timeWindow: string) => {
	return get<Movies>(`/trending/movie/${timeWindow}`);
};
