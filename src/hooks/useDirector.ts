import { useQuery } from '@tanstack/react-query';
import { getDirector } from '../services/tmdbAPI';
import { Crew_Member } from '../types/Actor.type'; 

const useDirector = (directorId: string) => {
  const {
    data: directorData,
    isFetching: isFetchingDirector,
    error: directorError
  } = useQuery<Crew_Member>(['director', directorId], () => getDirector(Number(directorId)));

  return {
    directorData,
    isFetchingDirector,
    directorError
  };
};

export default useDirector;
