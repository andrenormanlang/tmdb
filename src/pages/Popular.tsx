import { Container } from "react-bootstrap";
import usePopular from "../hooks/usePopular"; // Import your custom hook
import MoviesGridWithReleaseDate from "../components/MoviesGridWithReleaseDate";

const Popular = () => {
  const { data, isFetching, error } = usePopular();

  if (isFetching) {
    return
  }

  if (error) {
    return <p>Error fetching movies</p>;
  }

  const movieResults = data?.results ?? [];

  return (
    <Container>
      <h1 className="mb-4">Most Popular Movies Now!</h1>
      <MoviesGridWithReleaseDate movies={movieResults} />
    </Container>
  );
};

export default Popular;
