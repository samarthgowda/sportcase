import openSeaApi from "open-sea-api";

export const getCollectionStatsBySlug = async (collectionSlug) => {
  try {
    const res = await openSeaApi.get(`/v1/collection/${collectionSlug}/stats`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};
