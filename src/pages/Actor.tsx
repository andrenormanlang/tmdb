import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getActor, getActorCredits } from '../services/tmdbAPI';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

const Actor = () => {
  const { id } = useParams<{ id: string }>();

  const { data: actorData, isFetching: isFetchingActor, error: actorError } = useQuery(
    ['actor', id],
    () => getActor(Number(id))
  );

  const { data: creditsData, isFetching: isFetchingCredits, error: creditsError } = useQuery(
    ['actorCredits', id],
    () => getActorCredits(Number(id))
  );

  if (isFetchingActor || isFetchingCredits) {
    return <p>Loading...</p>;
  }

  if (actorError || creditsError) {
    return <p>Error fetching actor information</p>;
  }

  if (actorData && creditsData) {
    return (
      <Container>
        <h1 className="mb-4">{actorData.name}</h1>
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original${actorData.profile_path}`}
              />
            </Card>
          </Col>
          <Col lg={8}>
            <h2>Biography</h2>
            <p>{actorData.biography}</p>
            <h2>Filmography</h2>
            <Row xs={2} md={4} className="g-4">
              {creditsData.cast.map((credit) => (
                <Col key={credit.credit_id}>
                  <Card className="movie-card">
                    {credit.poster_path && (
                      <Card.Img
                        variant="top"
                        src={`https://image.tmdb.org/t/p/w185${credit.poster_path}`}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>
                        <RouterLink
                          to={`/${credit.id}`}
                          className="movie-title text-decoration-none"
                        >
                          {credit.title}
                        </RouterLink>
                      </Card.Title>
                      <Card.Subtitle className="mt-2 person-character">
                       as {credit.character}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return null;
  }
};

export default Actor;
