import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GenreCardSkeleton = () => {
  return (
    <Card width={"20px"} display={'flex'}>
      <Skeleton height={"20px"} borderRadius={10} overflow={"hidden"} />
      <CardBody>
        <SkeletonText height={'10px'} />
      </CardBody>
    </Card>
  );
};

export default GenreCardSkeleton;
