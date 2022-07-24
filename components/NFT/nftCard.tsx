import {
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const GATEWAY_REWRITE = "https://cloudflare-ipfs.com/ipfs/";

export const ipfsLink = (url) => {
  if (!url) return "";
  return url.replace("ipfs://", GATEWAY_REWRITE);
};

const NFTCard = ({ nft: nftToken }) => {
  const {
    isLoading,
    error,
    data: { data: nft } = { data: null },
  } = useQuery(["useNFTMetadata", nftToken.tokenId], () =>
    axios.get(nftToken?.tokenUri?.gateway)
  );

  return (
    <Tooltip label={nft ? `View ${nft?.name} on OpenSea` : "View on OpenSea"}>
      <LinkBox maxW="sm" p="5" borderWidth="1px" rounded="md" w="100%">
        <LinkOverlay
          href={`https://opensea.io/assets/ethereum/${nftToken.contract.address}/${nftToken.tokenId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {nft?.image && (
            <Image src={ipfsLink(nft.image)} alt={nft?.name} rounded="lg" />
          )}
          <Heading as="h4" fontWeight={600} fontSize="md" mt={4}>
            {nft?.name}
          </Heading>
        </LinkOverlay>
      </LinkBox>
    </Tooltip>
  );
};

export default NFTCard;
