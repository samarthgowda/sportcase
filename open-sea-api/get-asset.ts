import openSeaApi from "open-sea-api";

const getAsset = async (contractAddress, tokenId) => {
  try {
    const res = await openSeaApi.get(`v1/asset/${contractAddress}/${tokenId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

export default getAsset;
