// In this case, we'll have owner 1 create a transaction and owner 2 send it and pay for the gas fees
// https://docs.safe.global/learn/safe-core/safe-core-account-abstraction-sdk/protocol-kit
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { ethers } from "ethers";
import safe, { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";

import safeApiKit from "@safe-global/api-kit";

const { default: SafeApiKit } = safeApiKit;
const { default: Safe } = safe;

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

const safeService = new SafeApiKit({
  txServiceUrl: process.env.TX_SERVICE_URL,
  ethAdapter: ethAdapterOwner1,
});

const safeSdkOwner1 = await Safe.create({
  ethAdapter: ethAdapterOwner1,
  safeAddress: process.env.SAFE_ADDRESS,
});

const amount = ethers.utils.parseUnits("0.005", "ether").toString();

const safeTransaction = await safeSdkOwner1.createTransaction({
  safeTransactionData: {
    to: "0xCdcc3Ae823F05935f0b9c35C1054e5C144401C0a",
    data: "0x",
    value: amount,
  },
});

const safeTxHash = await safeSdkOwner1.getTransactionHash(safeTransaction);

// Sign transaction to verify that the transaction is coming from owner 1
const senderSignature = await safeSdkOwner1.signTransactionHash(safeTxHash);

await safeService.proposeTransaction({
  safeAddress: process.env.SAFE_ADDRESS,
  safeTransactionData: safeTransaction.data,
  safeTxHash,
  senderAddress: await owner1Signer.getAddress(),
  senderSignature: senderSignature.data,
});

const pendingTransactions = (
  await safeService.getPendingTransactions(process.env.SAFE_ADDRESS)
).results;

const transaction = pendingTransactions[0];

// Now that we have the transaction signed by wallet 1, we can do what we want such as signing with wallet 2
// in this case we won't bother, we'll have wallet 1 send it directly, but we get the idea
// interesting thing is that I can see the pending transaction in the wallet, onchain and offchain!

const safeTransactionFromService = await safeService.getTransaction(
  transaction.safeTxHash
);
const executeTxResponse = await safeSdkOwner1.executeTransaction(
  safeTransactionFromService
);
const receipt = await executeTxResponse.transactionResponse?.wait();

console.log("Transaction executed:");
console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`);
