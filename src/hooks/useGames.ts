import { FetchResponse } from '../services/api-client'
import { GameQuery } from '../App';
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { fullDay } from "./useGenres";
import { Platform } from './usePlatforms';


export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[]; // array of platform objects
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient.get<FetchResponse<Game>>("/games", {
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      })
      .then(res => res.data),
      staleTime: fullDay
  });
 

export default useGames;


//  useData<Game>(
//     "/games",
//     {
//       params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform?.id, ordering: gameQuery.sortOrder, search: gameQuery.searchText },
//     },
//     [gameQuery]
//   );
