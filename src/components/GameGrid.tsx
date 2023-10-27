import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';
import { GameQuery } from '../App';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


interface Props {
  gameQuery: GameQuery;
}


const GameGrid = ({ gameQuery }: Props) => {
  // cleanign by making custom hook

  const { 
    data, 
    error, 
    isLoading, 
    // isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage  
  } = useGames(gameQuery);
  const skeletons: number[] = [1, 2, 3, 4, 5, 6];


  if(error) return <Text>{error.message}</Text>

  const fetchGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  return (
    <Box padding={10}>
      <InfiniteScroll
        dataLength={fetchGamesCount}
        hasMore={!!hasNextPage} // to be converted to boolean !!
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
          {data?.pages.map(
            (
              page,
              index // implement pages from the GameQuery prop to load more games
            ) => (
              <React.Fragment key={index}>
                {page.results.map((game) => (
                  <GameCardContainer key={game.id}>
                    <GameCard game={game} />
                  </GameCardContainer>
                ))}
              </React.Fragment>
            )
          )}
        </SimpleGrid>
      </InfiniteScroll>
    </Box>
  );
};

export default GameGrid


{
  /* // Have the buuton to load more 
      {hasNextPage && (
      <Button marginY={3} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )} */
}