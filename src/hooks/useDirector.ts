import { useQuery } from "@tanstack/react-query";
import { getDirector } from "../services/tmdbAPI";
import { Crew } from "../types/Movie.types";

const useDirector = (directorId: string) => {
  const {
    data: directorData,
    isFetching: isFetchingDirector,
    error: directorError,
  } = useQuery< Crew | undefined>(["director", directorId], () =>
    getDirector(Number(directorId))
  );

  return {
    directorData: directorData ? [directorData] : [], // Wrap in an array if not null
    isFetchingDirector,
    directorError,
  };
};

export default useDirector;
