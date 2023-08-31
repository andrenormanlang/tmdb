export type MovieType = {
  adult?: boolean;
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
  credits: {
    crew: Crew[];
    cast: Cast[];
  };
  similar: {
    page: number;
    results: SimilarMovie[];
    total_pages: number;
    total_results: number;
  };
};

export type Cast = {
	poster_path: any;
	title: string | null;
  id: number;
  character: string;
  credit_id: string;
  name: string;
  profile_path: string | null;
};

export type Crew = {
  id: number;
  department: string;
  original_language: string;
  job: string;
  name: string;
  profile_path: string | null;
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

export type CrewCredit = {
  id: number;
  department: string;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: string;
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string | null;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
};

export type Credits = {
  cast: CastCredit[];
  crew: CrewCredit[];
};

export type CastCredit = {
  character: string;
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  overview: string;
  poster_path: string[]
};

