import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY_ARB_MAINNET,
  network: Network.ARB_MAINNET,
};

const alchemy = new Alchemy(settings);

export default alchemy;
