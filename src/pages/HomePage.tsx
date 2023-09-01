import { useState } from "react";
import { Container } from "react-bootstrap";
import useTrending from "../hooks/useTrending";
import MoviesGridWithReleaseDate from "../components/MoviesGridWithReleaseDate"
const HomePage = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const { trendingMovies, isFetching, error } = useTrending(timeWindow);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching trending movies</p>;
  }

  return (
    <Container>
      <h1 className="mb-4">Welcome to TMDB!</h1>
      <div className="trending-container mb-3">
        <div className="trending-label">
          <span className="trending">Trending</span>
        </div>
        <div
          className={`toggle-button ${timeWindow === "day" ? "day" : "week"}`}
          onClick={() => {
            setTimeWindow((prevTimeWindow) =>
              prevTimeWindow === "day" ? "week" : "day"
            );
          }}
        >
          <div className="toggle-handle">
            <div className="toggle-label left">Today</div>
            <div className="toggle-label right">This Week</div>
          </div>
        </div>
      </div>
      {trendingMovies && trendingMovies.length > 0 ? (
        <MoviesGridWithReleaseDate movies={trendingMovies} />
      ) : (
        <p>No trending movies available.</p>
      )}
    </Container>
  );
};

export default HomePage;
