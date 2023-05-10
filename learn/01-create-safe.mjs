// Let's create a new safe https://docs.safe.global/learn/quickstart/different-ways-to-create-a-safe
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { ethers } from "ethers";
import Safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //1
const signerWallet = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY,
  provider
);
const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: signerWallet,
});

const safeFactory = await SafeFactory.create({ ethAdapter }); //4
const safeSdk = await safeFactory.deploySafe({
  safeAccountConfig: {
    threshold: 1,
    owners: [
      "0xd3F3c25e58A72784d091E0D88FAC32EC95036C2a",
      "0xCdcc3Ae823F05935f0b9c35C1054e5C144401C0a",
    ],
  },
});
