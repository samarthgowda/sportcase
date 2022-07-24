import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import getCollectionNFTs from "alchemy-sdk/get-nfts-by-collection";
import Layout from "components/Layout";
import NFTCard from "components/NFT/nftCard";
import millify from "millify";
import { useRouter } from "next/router";
import { getCollectionBySlug } from "open-sea-api/get-collection";
import { getCollectionStatsBySlug } from "open-sea-api/get-collection-stats";
import { useEffect, useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import {
  SiDiscord,
  SiInstagram,
  SiMedium,
  SiTelegram,
  SiTwitter,
  SiWikipedia,
} from "react-icons/si";

const DEFAULT_BG_IMAGE =
  "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";

const Collection = () => {
  const router = useRouter();
  const { slug } = router.query;

  const fetchCollection = async () => {
    const contract = await getCollectionBySlug(slug);
    return contract;
  };

  const {
    isLoading: isLoadingCollection,
    isError: isErrorCollection,
    data: { collection } = { collection: null },
    error: errorCollection,
    isFetching: isFetchingCollection,
    // Using Opensea API
  } = useQuery(["fetchCollectionBySlug", slug], fetchCollection, {
    enabled: !!slug,
  });

  const [contractAddress, setContractAddress] = useState(null);

  useEffect(() => {
    if (
      collection &&
      collection.primary_asset_contracts &&
      collection.primary_asset_contracts.length > 0
    ) {
      setContractAddress(collection.primary_asset_contracts[0].address);
    }
  }, [collection]);

  const fetchCollectionNFTs = async () => {
    const nfts = await getCollectionNFTs(contractAddress);
    return nfts;
  };

  const fetchCollectionStats = async () => {
    if (collection && collection.slug) {
      const stats = await getCollectionStatsBySlug(collection.slug);
      return stats;
    } else {
      return null;
    }
  };

  const {
    isLoading: isLoadingNFTs,
    isError: isErrorNFTs,
    data: { nfts } = { nfts: null },
    error: errorNFTs,
    isFetching: isFetchingNFTs,
    // Using Alchemy
  } = useQuery(["fetchNFTsByCollectionOpenSea", slug], fetchCollectionNFTs, {
    enabled: !!contractAddress,
  });

  const {
    isLoading: isLoadingStats,
    isError: isErrorStats,
    data: datastats = null,
    error: errorStats,
    isFetching: isFetchingStats,
    // Using Alchemy
  } = useQuery(["fetchStatsForCollectionOpenSea", slug], fetchCollectionStats, {
    enabled: !!slug,
  });

  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box w="100%" h="100%" my={4} px={{ base: 4, md: 6 }}>
      {isLoadingCollection ? (
        <Spinner />
      ) : (
        <>
          <Image
            alt="cover-image"
            src={collection?.banner_image_url || DEFAULT_BG_IMAGE}
            w="100%"
            h={250}
            rounded="lg"
            objectFit="cover"
          />
          <VStack
            align="flex-start"
            spacing={4}
            w="100%"
            px={4}
            mt={{ base: -12, md: -16 }}
          >
            <Flex
              w="100%"
              align="flex-end"
              justify="space-between"
              px={{ base: 0, md: 4 }}
            >
              <Box
                display="inline-block"
                borderColor="white"
                borderWidth="4px"
                shadow="md"
                rounded="full"
              >
                <Avatar
                  name={collection?.name || "sportcase"}
                  src={collection?.image_url}
                  color="black"
                  bgColor="pink"
                  objectFit="cover"
                  size="2xl"
                />
              </Box>
              <HStack>
                {collection?.external_url && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={collection.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="external-url"
                    icon={<HiOutlineGlobeAlt />}
                  />
                )}
                {collection?.discord_url && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={collection.discord_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="discord-url"
                    icon={<SiDiscord />}
                  />
                )}
                {collection?.instagram_username && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={`https://www.instagram.com/${collection.instagram_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="instagram-url"
                    icon={<SiInstagram />}
                  />
                )}
                {collection?.twitter_username && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={`https://twitter.com/${collection.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="twitter-url"
                    icon={<SiTwitter />}
                  />
                )}
                {collection?.medium_username && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={`https://medium.com/${collection.medium_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="medium-url"
                    icon={<SiMedium />}
                  />
                )}
                {collection?.telegram_url && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={collection.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="telegram-url"
                    icon={<SiTelegram />}
                  />
                )}
                {collection?.wiki_url && (
                  <IconButton
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={collection.wiki_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="wiki-url"
                    icon={<SiWikipedia />}
                  />
                )}
                {collection?.slug && (
                  <Button
                    variant="solid"
                    colorScheme="gray"
                    as="a"
                    href={`https://opensea.io/collection/${collection.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="wiki-url"
                  >
                    View on OpenSea
                  </Button>
                )}
              </HStack>
            </Flex>
            {collection?.name && (
              <Heading as="h1" fontWeight={800}>
                {collection?.name}
              </Heading>
            )}
            {collection?.description && (
              // TODO: Convery this text from markdown to regular
              <Text
                display="inline-block"
                fontSize="md"
                fontWeight={500}
                color={textColor}
                width="75%"
              >
                {collection?.description}
              </Text>
            )}
            {datastats && datastats.stats && (
              <HStack spacing={10} py={2}>
                {datastats.stats.count && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight={800}
                      bgGradient="linear(to-r, blue.400, pink.400)"
                      bgClip="text"
                      display="inline-block"
                    >
                      {`${millify(datastats.stats.count, { precision: 2 })}`}
                    </Heading>
                    <Text color={textColor} fontSize="sm" fontWeight={500}>
                      Total Items
                    </Text>
                  </Box>
                )}
                {datastats.stats.num_owners && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight={800}
                      bgGradient="linear(to-r, blue.400, pink.400)"
                      bgClip="text"
                      display="inline-block"
                    >
                      {`${millify(datastats.stats.num_owners, {
                        precision: 2,
                      })}`}
                    </Heading>
                    <Text color={textColor} fontSize="sm" fontWeight={500}>
                      Total Owners
                    </Text>
                  </Box>
                )}
                {datastats.stats.total_supply && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight={800}
                      bgGradient="linear(to-r, blue.400, pink.400)"
                      bgClip="text"
                      display="inline-block"
                    >
                      {`${millify(datastats.stats.total_supply, {
                        precision: 2,
                      })}`}
                    </Heading>
                    <Text color={textColor} fontSize="sm" fontWeight={500}>
                      Items For Sale
                    </Text>
                  </Box>
                )}
                {datastats.stats.average_price && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight={800}
                      bgGradient="linear(to-r, blue.400, pink.400)"
                      bgClip="text"
                      display="inline-block"
                    >
                      {`${millify(datastats.stats.average_price, {
                        precision: 2,
                      })} ETH`}
                    </Heading>
                    <Text color={textColor} fontSize="sm" fontWeight={500}>
                      Average Price
                    </Text>
                  </Box>
                )}
                {datastats.stats.floor_price && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Heading
                      as="h3"
                      size="md"
                      fontWeight={800}
                      bgGradient="linear(to-r, blue.400, pink.400)"
                      bgClip="text"
                      display="inline-block"
                    >
                      {`${millify(datastats.stats.floor_price, {
                        precision: 2,
                      })} ETH`}
                    </Heading>
                    <Text color={textColor} fontSize="sm" fontWeight={500}>
                      Floor Price
                    </Text>
                  </Box>
                )}
              </HStack>
            )}
            <Box pt={{ base: 4, md: 8 }}>
              {isLoadingNFTs ? (
                <Spinner />
              ) : (
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {(nfts || []).map((nft, index) => {
                    if (!nft.tokenUri) return;
                    return <NFTCard key={index} nft={nft} />;
                  })}
                </Grid>
              )}
            </Box>
          </VStack>
        </>
      )}
    </Box>
  );
};

Collection.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Collection;
