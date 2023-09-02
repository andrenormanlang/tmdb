import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import useDirector from "../hooks/useDirector";
import photoNotAvailable from "../assets/images/photo-not-available.svg";
import { Crew } from "../types/Movie.types";

const Director = () => {
	const { id } = useParams<{ id?: string }>();
	const { directorData, isFetchingDirector, directorError } = useDirector(
		id || ""
	);

	if (isFetchingDirector) {
		return null;
	}

	if (directorError) {
		return <p>Error fetching director information</p>;
	}

	if (directorData && directorData.length > 0) {
		const director = directorData.find(
			(crewMember: Crew) => crewMember.job === "Director"
		);

		if (director) {
			return (
				<Container>
					<h1 className="mb-4">{director.name}</h1>
					<Row>
						<Col lg={4}>
							<Card>
								{director.profile_path ? (
									<Card.Img
										variant="top"
										src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
									/>
								) : (
									<Card.Img
										variant="top"
										src={photoNotAvailable}
									/>
								)}
							</Card>
						</Col>
						<Col lg={8}></Col>
					</Row>
				</Container>
			);
		}
	}

	return null; // No director with the job title "Director" found
};

export default Director;
