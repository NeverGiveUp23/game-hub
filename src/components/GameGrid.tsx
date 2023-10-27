import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardSkeleton from './GameCardSkeleton';
import GameCardContainer from './GameCardContainer';
import { GameQuery } from '../App';
import React from 'react';


interface Props {
  gameQuery: GameQuery;
}


const GameGrid = ({ gameQuery }: Props) => {
  // cleanign by making custom hook

  const { 
    data, 
    error, 
    isLoading, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage 
  } = useGames(gameQuery);
  const skeletons: number[] = [1, 2, 3, 4, 5, 6];


  if(error) return <Text>{error.message}</Text>
  return (
    <Box padding={10}> // moved padding to main frangment (Box)
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
        {data?.pages.map((page, index) => ( // implement pages from the GameQuery prop to load more games 
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      // Have the buuton to load more 
      {hasNextPage && (
      <Button marginY={3} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading..." : "Load More"}
        </Button>
      )}
    </Box>
  );
};

export default GameGrid