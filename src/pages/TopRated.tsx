import { useState } from "react";
import { Container } from "react-bootstrap";
import CustomPagination from "../components/CustomPagination";
import MoviesGridWithReleaseDate from "../components/MoviesGridWithReleaseDate";
import useTopRated from "../hooks/useTopRated";

const TopRated = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useTopRated(page);

  if (isFetching) {
    return
  }

  if (error) {
    return <p>Error fetching movies</p>;
  }

  const movieResults = data?.results ?? [];

  return (
    <Container>
      <h1 className="mb-4">Top Rated Movies!</h1>
      <MoviesGridWithReleaseDate movies={movieResults} />
      <CustomPagination
        page={page}
        totalPages={data?.total_pages}
        isFetching={isFetching}
        handlePreviousPage={() => setPage((prevPage) => prevPage - 1)}
        handleNextPage={() => setPage((prevPage) => prevPage + 1)}
      />
    </Container>
  );
};

export default TopRated;
