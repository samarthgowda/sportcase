import { getNftsForCollection } from "@alch/alchemy-sdk";
import alchemy from "alchemy-sdk";

const getCollectionNFTs = async (collectionAddress) => {
  // Get all NFTs
  try {
    const response = await getNftsForCollection(alchemy, collectionAddress);
    return response;
  } catch (err) {
    // console.log(err);
    throw Error(err);
  }
};

export default getCollectionNFTs;
