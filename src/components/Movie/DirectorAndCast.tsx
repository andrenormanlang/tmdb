import { Col, Row, Card } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { MovieType } from "../../types/Movie.types";
import photoNotAvailable from "../../assets/images/photo-not-available.svg";

interface DirectorAndCastProps {
  movieData: MovieType;
}

const DirectorAndCast: React.FC<DirectorAndCastProps> = ({ movieData }) => {
  // Find the director in the crew array
  const director = movieData.credits.crew.find(
    (crewMember) => crewMember.job === "Director"
  );

  return (
    <>
      <h2>Director</h2>
      <Row lg={4} md={4} sm={2} className="g-4">
        {director ? (
          <Col>
            <Card className="movie-card">
              {director.profile_path ? (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                />
              ) : (
                <Card.Img variant="top" src={photoNotAvailable} />
              )}
              <Card.Body>
                <Card.Title>
                  <RouterLink
                    to={`/person/${director.id}`}
                    className="person-name"
                  >
                    {director.name}
                  </RouterLink>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <p>No director information available</p>
        )}
      </Row>
      <h2>Main Cast</h2>
      <Row xs={2} md={4} className="g-4">
        {movieData.credits.cast.slice(0, 5).map((cast) => (
          <Col key={cast.credit_id}>
            <Card className="movie-card">
              {cast.profile_path ? (
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                />
              ) : (
                <Card.Img variant="top" src={photoNotAvailable} />
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
    </>
  );
};

export default DirectorAndCast;
