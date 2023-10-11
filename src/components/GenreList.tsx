
import { HStack, Image, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import croppedImagesUrl from '../services/image-url';
import GenreCardSkeleton from './GenreCardSkeleton';
import GenreCardContainer from './GenreCardContainer';

const GenreList = () => {
  const {data, isLoading, error} = useGenres();
  const skeletons: number[] = [1,2,3,4,5,6];

if(error) return null;


  return (
    <List>
      {isLoading &&
        skeletons.map((skeleton) => (
          <GenreCardContainer>
            <GenreCardSkeleton key={skeleton} />
          </GenreCardContainer>
        ))}
      {data.map((g) => (
        <ListItem key={g.id} paddingY={"5px"}>
          <HStack>
            <Image
              boxSize={"32px"}
              borderRadius={8}
              src={croppedImagesUrl(g.image_background)}
            />
            <Text fontSize={"lg"}> {g.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}

export default GenreList