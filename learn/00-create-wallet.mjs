import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { ethers } from "ethers";

async function createWallet() {
  const wallet = new ethers.Wallet.createRandom();

  const { address, mnemonic, privateKey } = wallet;

  console.log(address, mnemonic.phrase, privateKey);
}

createWallet();
