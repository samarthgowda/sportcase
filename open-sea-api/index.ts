import axios from "axios";

const openSeaApi = axios.create({
  baseURL: "https://api.opensea.io/api",
});

export default openSeaApi;
