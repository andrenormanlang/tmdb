import { Card } from "react-bootstrap";
import { MovieType } from "../../types/Movie.types";
import posterNotAvailable from "../../assets/images/poster-not-available.svg";

interface MovieHeaderProps {
	movieData: MovieType;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({ movieData }) => {
	return (
		<>
			<Card>
				{movieData.poster_path ? (
					<Card.Img
						variant="top"
						src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
					/>
				) : (
					<Card.Img
						variant="top"
						src={posterNotAvailable}
						alt="Poster Not Available"
					/>
				)}
			</Card>
		</>
	);
};

export default MovieHeader;
