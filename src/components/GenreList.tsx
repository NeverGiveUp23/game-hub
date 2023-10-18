
import { Button, HStack, Heading, Image, List, ListItem } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import croppedImagesUrl from '../services/image-url';
interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({selectedGenre, onSelectGenre}: Props) => {
  const {data, error} = useGenres();

  if(error) return null;

  return (
    <>
    <Heading fontSize={'2xl'} marginBottom={3}>Genres</Heading>
      <List>
        {/* {isLoading &&
          skeletons.map((skeleton) => (
            <GenreCardContainer key={skeleton}>
              <GenreCardSkeleton />
            </GenreCardContainer>
          ))} */}
        {data?.results.map((g) => (
          <ListItem key={g.id} paddingY={"5px"}>
            <HStack>
              <Image
                objectFit={"cover"}
                boxSize={"32px"}
                borderRadius={8}
                src={croppedImagesUrl(g.image_background)}
              />
              <Button
                textAlign={"left"}
                whiteSpace={"normal"}
                fontWeight={g.id === selectedGenre?.id ? "bold" : "normal"}
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
    </>
  );
}

export default GenreList