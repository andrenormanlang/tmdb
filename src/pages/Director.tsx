import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import useDirector from "../hooks/useDirector";

const Director = () => {
	const { id } = useParams<{ id?: string }>();
	const { directorData, isFetchingDirector, directorError } = useDirector(
		id || ""
	);

	if (isFetchingDirector) {
		return
	}

	if (directorError) {
		return <p>Error fetching director information</p>;
	}

	if (directorData) {
		return (
			<Container>
				<h1 className="mb-4">{directorData.name}</h1>
				<Row>
					<Col lg={4}>
						<Card>
							<Card.Img
								variant="top"
								src={`https://image.tmdb.org/t/p/original${directorData.profile_path}`}
							/>
						</Card>
					</Col>
					<Col lg={8}>
						<h2>Biography</h2>
						<p>{directorData.biography}</p>
					</Col>
				</Row>
			</Container>
		);
	} else {
		return null;
	}
};

export default Director;
