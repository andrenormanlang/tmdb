import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../services/tmdbAPI";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link as RouterLink } from 'react-router-dom';
import { MovieType } from "../types/Movie.types";

const Movie = () => {
	const { id } = useParams<{ id: string }>();

	const {
		data: movieData,
		isFetching,
		error,
	} = useQuery(["movie", id], () => getMovie(Number(id)));

	useEffect(() => {
		if (movieData) {
			updateRecentlyViewed(movieData);
		}
	}, [movieData]);

	if (isFetching) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error fetching movie</p>;
	}

	return (
		<Container>
			 {movieData && (
        <>
          <h1 className="mb-4">{movieData.title}</h1>
          <Row>
            <Col lg={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
                />
              </Card>
            </Col>
            <Col lg={8}>
              <h2>Overview</h2>
              <p>{movieData.overview}</p>
              <h2>Release Date</h2>
              <p>
                {new Date(movieData.release_date).toLocaleDateString(
                  'en-GB',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  }
                )}
              </p>
              <h2>Director</h2>
              <Row xs={2} md={4} className="g-4">
                <Col>
                  <Card className="movie-card">
                    {movieData.credits.crew[0]?.profile_path && (
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w185${movieData.credits.crew[0].profile_path}`}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>
                        <RouterLink
                          to={`/person/${movieData.credits.crew[0].id}`}
                          className="person-name"
                        >
                          {movieData.credits.crew[0].name}
                        </RouterLink>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <h2>Main Cast</h2>
              <Row xs={2} md={4} className="g-4">
                {movieData.credits.cast.slice(0, 5).map((cast) => (
                  <Col key={cast.credit_id}>
                    <Card className="movie-card">
                      {cast.profile_path && (
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>
                          <RouterLink
                            to={`/person/${cast.id}`}
                            className="person-name text-decoration-none"
                          >
                            {cast.name}
                          </RouterLink>
                        </Card.Title>
                        <Card.Subtitle className="mt-2 person-character">
                          {cast.character}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <h2>Similar Films</h2>
              <Row xs={2} md={4} className="g-4">
                {movieData.similar?.results.map((movie) => (
                  <Col key={movie.id}>
                    <Card className="movie-card">
                      {movie.poster_path && (
                        <Card.Img
                          variant="top"
                          src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>
                          <RouterLink
                            to={`/${movie.id}`}
                            className="movie-title text-decoration-none"
                          >
                            {movie.title}
                          </RouterLink>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
		</Container>
	);
};

const updateRecentlyViewed = (movie: MovieType) => {
	const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
	let recentlyViewed = storedRecentlyViewed
		? JSON.parse(storedRecentlyViewed)
		: [];

	recentlyViewed = recentlyViewed.filter(
		(viewedMovie: { id: number }) => viewedMovie.id !== movie.id
	);
	recentlyViewed.unshift(movie);

	if (recentlyViewed.length > 10) {
		recentlyViewed.pop();
	}

	localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
};

export default Movie;
