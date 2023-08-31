import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../services/tmdbAPI";
import { Genres } from "../types/tmdb.types";
import { NavLink, Link, useNavigate } from "react-router-dom";



function Navigation() {
	const navigate = useNavigate();
	const { data: genres } = useQuery<Genres>(["genres"], getGenres);
	const [showModal, setShowModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		handleCloseModal();
		navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
	};

	const isSearchButtonDisabled = searchQuery.trim() === "";

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid className="nav-text">
				<Navbar.Brand className="tmdb-logo" as={Link} to="/">
					TMDB
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" navbarScroll>
						<Nav.Link as={NavLink} to="/">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/latest">
							Latest Movies
						</Nav.Link>
						<Nav.Link as={NavLink} to="/upcoming">
							Coming Soon
						</Nav.Link>
						<Nav.Link as={NavLink} to="/popular">
							Popular Movies
						</Nav.Link>
						<Nav.Link as={NavLink} to="/toprated">
							Top Rated
						</Nav.Link>
						<Nav.Link as={NavLink} to="/last10visits">
							Last 10 visits
						</Nav.Link>
						<Nav.Item>
							<Button
								variant="link"
								onClick={handleOpenModal}
								className="text-decoration-none nav-link"
							>
								Genres
							</Button>
						</Nav.Item>
					</Nav>
					<Form className="d-flex flex-column flex-lg-row" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search for a movie..."
              className="me-2 mb-2 mb-lg-0"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline-success"
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
				</Navbar.Collapse>
			</Container>
			<Modal show={showModal} onHide={handleCloseModal} fullscreen>
				<Modal.Header closeButton>
					<Modal.Title className="text-secondary">Genres</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{genres &&
						genres.genres.map((genre) => (
							<p key={genre.id}>
								<Link
									to={`/genre/${genre.id}`}
									onClick={handleCloseModal}
									className="text-decoration-none text-reset"
								>
									{genre.name}
								</Link>
							</p>
						))}
				</Modal.Body>
			</Modal>
		</Navbar>
	);
}

export default Navigation;
