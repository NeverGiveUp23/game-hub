
import { Button, HStack, Image, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import croppedImagesUrl from '../services/image-url';
import GenreCardSkeleton from './GenreCardSkeleton';
import GenreCardContainer from './GenreCardContainer';

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({onSelectGenre}: Props) => {
  const {data, isLoading, error} = useGenres();
  const skeletons: number[] = [1,2,3,4,5,6];

if(error) return null;


  return (
    <List>
      {isLoading &&
        skeletons.map((skeleton) => (
          <GenreCardContainer key={skeleton}>
            <GenreCardSkeleton />
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
            <Button
              onClick={() => onSelectGenre(g)}
              fontSize={"lg"}
              variant={"link"}
            >
              {" "}
              {g.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}

export default GenreList