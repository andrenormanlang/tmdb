import { MovieType } from "../../types/Movie.types";

interface MovieInfoProps {
	movieData: MovieType;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movieData }) => {
	return (
		<>
			<div className="info-container">
				<h2>Overview</h2>
				<p>{movieData.overview}</p>
				<h2>Release Date</h2>
				<p>
					{new Date(movieData.release_date).toLocaleDateString(
						"en-GB",
						{
							year: "numeric",
							month: "long",
							day: "2-digit",
						}
					)}
				</p>
				<p>{movieData.runtime} minutes</p>
			</div>
		</>
	);
};

export default MovieInfo;
