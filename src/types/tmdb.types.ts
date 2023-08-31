import { MovieType } from "./Movie.types";

export type Movies = {
	page: number;
	results: MovieType[];
	total_pages: number;
	total_results: number;
};

export type Genre = {
	id: number;
	name: string;
};

export type Genres = {
	genres: Genre[];
};
