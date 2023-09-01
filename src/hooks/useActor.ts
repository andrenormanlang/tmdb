import { useQuery } from "@tanstack/react-query";
import { getActor, getActorCredits } from "../services/tmdbAPI";
import { Crew_Member } from "../types/Actor.type";
import { Credits } from "../types/Movie.types";

const useActor = (actorId: string) => {
	const {
		data: actorData,
		isFetching: isFetchingActor,
		error: actorError,
	} = useQuery<Crew_Member>(["actor", actorId], () =>
		getActor(Number(actorId))
	);

	const {
		data: creditsData,
		isFetching: isFetchingCredits,
		error: creditsError,
	} = useQuery<Credits>(["actorCredits", actorId], () =>
		getActorCredits(Number(actorId))
	);

	return {
		actorData,
		isFetchingActor,
		actorError,
		creditsData,
		isFetchingCredits,
		creditsError,
	};
};

export default useActor;
