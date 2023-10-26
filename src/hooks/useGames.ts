import { GameQuery } from '../App';
import { useQuery } from "@tanstack/react-query";
import { fullDay } from "./useGenres";
import { Platform } from './usePlatforms';
import apiClient, {FetchResponse} from '../services/api-client';

const api = new apiClient<Game>('/games')


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
    queryFn: () =>   // refactoring and adding the api class method 
      api
      .getAll({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
        },
      }),
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
