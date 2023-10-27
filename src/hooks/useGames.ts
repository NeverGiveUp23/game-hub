import { GameQuery } from '../App';
import { useInfiniteQuery } from "@tanstack/react-query";
import { Platform } from './usePlatforms';
import apiClient, {FetchResponse} from '../services/api-client';
import ms from 'ms';

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
  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>   // refactoring and adding the api class method 
      api
      .getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam
        },
      }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next?  allPages.length + 1 : undefined;
      },
      staleTime: ms('24h')
  });

export default useGames;


//  useData<Game>(
//     "/games",
//     {
//       params: { genres: gameQuery.genre?.id, platforms: gameQuery.platform?.id, ordering: gameQuery.sortOrder, search: gameQuery.searchText },
//     },
//     [gameQuery]
//   );
