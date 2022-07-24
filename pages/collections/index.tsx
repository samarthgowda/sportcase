import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Layout from "components/Layout";
import NextLink from "next/link";
import { getCollectionBySlug } from "open-sea-api/get-collection";

const OPENSEA_COLLECTION_SLUGS = [
  "boxingboyz-metaverse",
  "mclarenmsolabgenesis",
  "nfteams-club",
  "blockasset-legends",
  "wrapped-strikers",
  "the-association-nft",
  "wofcapts",
  "lamelo-ball-collectibles",
  "5km",
  "silks-genesis-avatars",
  "vba-players",
  "wagmiunited",
  "lion-club",
  "diamond-dawgs",
  "legionfarm-gaming-heroes-1",
  "nice-official",
  "f1-delta-time",
  "rumble-kong-league-sneakers",
  "projectfives",
  "fanzone-io-sports-club",
  // "player-tokens",
  // "presalefw",
  // "apexathletes",
  // "tennis-champs-genesis",
  // "olympic-babiz-official-1",
  // "worldcupapes-official",
  // "big3-ownership",
];

const Collections = () => {
  const fetchCollections = async () => {
    const res = [];

    for (let i = 0; i < OPENSEA_COLLECTION_SLUGS.length; i++) {
      const { collection } = await getCollectionBySlug(
        OPENSEA_COLLECTION_SLUGS[i]
      );
      if (collection?.primary_asset_contracts.length > 0) {
        res.push(collection);
      }
    }
    return res;
  };
  const {
    isLoading,
    isError,
    data: collections,
    error,
    isFetching,
  } = useQuery(["fetchCollectionsOpenSea"], fetchCollections);

  console.log(collections);

  const bgColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Box>
      <Heading as="h1" mb={{ base: 4, md: 8 }}>
        Sports NFTs
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={{ base: 4, md: 8, lg: 12 }}
      >
        {!isLoading ? (
          (collections || []).map((collection, index) => {
            const slug = collection?.slug;
            const banner_image_url = collection?.banner_image_url;
            const image_url = collection?.image_url;
            const name = collection?.name;
            const description = collection?.description;

            return (
              <GridItem as={LinkBox} key={index} rounded="lg" bgColor={bgColor}>
                <Box display="flex" flexDir="column">
                  <Image
                    src={banner_image_url}
                    objectFit="cover"
                    alt={name}
                    h={150}
                    w="100%"
                    rounded="lg"
                  />
                  <Flex
                    align="center"
                    gap={4}
                    p={{ base: 2, md: 4, lg: 6 }}
                    mt={-2}
                  >
                    <Image
                      src={image_url}
                      objectFit="cover"
                      alt={image_url}
                      h={100}
                      w={100}
                      rounded="lg"
                      mt={{ base: -6, md: -12, lg: -16 }}
                      zIndex="99999"
                      bgColor="white"
                      p="3px"
                    />
                    <Box>
                      <NextLink href={`/collections/${slug}`} passHref>
                        <LinkOverlay>
                          <Heading as="h3" fontSize="xl" fontWeight={800}>
                            {name}
                          </Heading>
                        </LinkOverlay>
                      </NextLink>
                      <Text
                        mt={2}
                        fontSize="sm"
                        lineHeight={1.2}
                        color="gray.500"
                        noOfLines={2}
                      >
                        {description}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            );
          })
        ) : (
          <Spinner />
        )}
      </Grid>
    </Box>
  );
};

Collections.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Collections;
