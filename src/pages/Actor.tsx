import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import useActor from "../hooks/useActor";
import photoNotAvailable from "../assets/images/photo-not-available.svg"
import posterNotAvailable from "../assets/images/poster-not-available.svg";

const Actor = () => {
	const { id } = useParams<{ id?: string }>();

	const {
		actorData,
		isFetchingActor,
		actorError,
		creditsData,
		isFetchingCredits,
		creditsError,
	} = useActor(id || "");

	if (isFetchingActor || isFetchingCredits) {
		return null;
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

							{actorData.profile_path ? (
								<Card.Img
									variant="top"
									src={`https://image.tmdb.org/t/p/original${actorData.profile_path}`}
								/>
							) : (

								<Card.Img
									variant="top"
									src={photoNotAvailable}
								/>
							)}
						</Card>
					</Col>
					<Col lg={8}>
						<h2>Biography</h2>
						<div className="info-container">
							<p>{actorData.biography}</p>
						</div>
						<h2>Filmography</h2>
						<Row xs={2} md={4} className="g-4">
							{creditsData.cast.map((credit) => (
								<Col key={credit.credit_id}>
									<Card className="movie-card">

										{credit.poster_path ? (
											<Card.Img
												variant="top"
												src={`https://image.tmdb.org/t/p/w185${credit.poster_path}`}
											/>
										) : (

											<Card.Img
												variant="top"
												src={posterNotAvailable}
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
