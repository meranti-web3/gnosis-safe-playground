// I have a new gnosis safe, I want to transfer funds from the goerli account that created the safe to the safe itself.
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { ethers } from "ethers";
import { EthersAdapter } from "@safe-global/protocol-kit";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Initialize signers
const owner1Signer = new ethers.Wallet(
  process.env.WALLET_PRIVATE_KEY,
  provider
);

const ethAdapterOwner1 = new EthersAdapter({
  ethers,
  signerOrProvider: owner1Signer,
});

const safeAmount = ethers.utils.parseUnits("0.01", "ether").toHexString();

const transactionParameters = {
  to: process.env.SAFE_ADDRESS,
  value: safeAmount,
};

const tx = await owner1Signer.sendTransaction(transactionParameters);

console.log("Fundraising.");
console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`);
