import React from "react";
import { Card } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import posterNotAvailable from "../assets/images/poster-not-available.svg";

interface MovieCardProps {
	movie: {
		id: number;
		title: string;
		release_date: string;
		runtime: number;
		poster_path: string | null;
	};
}

const MovieCardWithReleaseDate: React.FC<MovieCardProps> = ({ movie }) => {
	const formattedReleaseDate = new Date(
		movie.release_date
	).toLocaleDateString("en-GB", {
		year: "numeric",
		month: "long",
		day: "2-digit",
	});

	return (
		<RouterLink to={`/${movie.id}`} className="text-decoration-none">
			<Card className="movie-card">
				{movie.poster_path ? (
					<Card.Img
						variant="top"
						src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					/>
				) : (
					<Card.Img
						variant="top"
						src={posterNotAvailable}
						alt="Poster Not Available"
					/>
				)}
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					<div className="mt-1">Release Date:</div>
					<div className="date-font-size release-date mt-2">
						{formattedReleaseDate}
					</div>
				</Card.Body>
			</Card>
		</RouterLink>
	);
};

export default MovieCardWithReleaseDate;
