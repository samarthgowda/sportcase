import openSeaApi from "open-sea-api";

export const getCollectionBySlug = async (collectionSlug) => {
  try {
    const res = await openSeaApi.get(`/v1/collection/${collectionSlug}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

export const getCollectionByContractAddress = async (contractAddress) => {
  try {
    const res = await openSeaApi.get(`/v1/asset_contract/${contractAddress}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
