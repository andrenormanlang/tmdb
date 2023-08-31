import  { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useTrending } from "../hooks/useTrending";
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  // const [timeWindow, setTimeWindow] = useState("day");
  // const { trendingMovies, isLoading, error } = useTrending(timeWindow);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error fetching trending movies</p>;
  // }

  // const handleToggleTimeWindow = () => {
  //   setTimeWindow((prevTimeWindow) => (prevTimeWindow === "day" ? "week" : "day"));
  // };

  // const timeWindowText = timeWindow === "day" ? "Today" : "This week'";
  // const backgroundColor = timeWindow === "day" ? "#001F3F" : "#17a2b8"; // You can adjust the colors

	const [timeWindow, setTimeWindow] = useState("day");
  const { trendingMovies, isLoading, error } = useTrending(timeWindow);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching trending movies</p>;
  }

  return (
		<Container>
		 <h1 className="mb-4">Welcome to TMDB!</h1>
      <div className="trending-container">
        <div className="trending-label">Trending</div>
        <div
          // className={`toggle-button ${timeWindow}`}
						className={`toggle-button ${timeWindow === "day" ? "day" : "week"}`}
						onClick={() => {
							setTimeWindow((prevTimeWindow) =>
								prevTimeWindow === "day" ? "week" : "day"
							);
						}}
					>
          <div className="toggle-handle">
            {/* {timeWindow === "day" ? "Today" : "This Week"} */}
						<div className="toggle-label left">Today</div>
						<div className="toggle-label right">This Week</div>
          </div>
        </div>
      </div>
		{trendingMovies && trendingMovies.length > 0 ? (
			<Row className="g-3">
				{trendingMovies.map((movie) => {
					const releaseDate = movie.release_date
						? new Date(movie.release_date).toLocaleDateString("en-GB", {
								year: "numeric",
								month: "long",
								day: "2-digit",
							})
						: "N/A";

					return (
						<Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
						<RouterLink to={`/${movie.id}`} className="text-decoration-none">
							<Card className="h-100">
								{movie.poster_path && (
									<Card.Img
										variant="top"
										src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
										alt={movie.title}
										className="movie-poster"
									/>
								)}
								<Card.Body>
									<Card.Title className="mb-2">{movie.title}</Card.Title>
									<Card.Text className="text-muted">
									Release Date:<br/>{releaseDate}
									</Card.Text>
								</Card.Body>
							</Card>
						</RouterLink>
						</Col>
					);
				})}
			</Row>
		) : (
			<p>No trending movies available.</p>
		)}
	</Container>
  );
};

export default HomePage;
