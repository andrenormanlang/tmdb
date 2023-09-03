export type MovieType = {
	adult?: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | "null";
	release_date: string;
	runtime: number;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	credits: {
		crew: CrewCredit[];
		cast: CastCredit[];
	};
	similar: {
		page: number;
		results: SimilarMovie[];
		total_pages: number;
		total_results: number;
	};
};

export type Credits =   {
	crew: CrewCredit[];
	cast: CastCredit[];
};

export type CastCredit = {
	poster_path: any;
	title: string | null;
	id: number;
	character: string;
	credit_id: string;
	name: string;
	profile_path: string | null;
	known_for_department: string;
};

export type CrewCredit = {
	id: number;
	department: string;
	original_language: string;
	job: string;
	name: string;
	profile_path: string | null;
	known_for_department: string;
};

export type SimilarMovie = {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};


