# Gnosis Safe Playground

This is a playground for trying out Gnosis safe.

# Safe

Gnosis Safe is a tool built on Account Abstractions (EIP-4337) to provide blockchain users with "decentralized custody and collective asset management".

I'd like to try out Safe to:

1. Have an ERC721 Smart Contract owned/managed by multiple Externally Owned Accounts via one Safe
2. Be able to add/remove ERC721 owners by updating the Safe account, without updating the ERC721 account
3. Delegate gas fees to the Safe account instead of the Contract Caller
4. Delegate gas fees to a different wallet than the wallet deploying the ERC721

Not sure if any or all of those are doable, and I'd like to know what other type of features I can get from a Gnosis Safe. Let's get started!

# Tech Stack

We'll be testing on Polygon zkEVM. Smart Contracts will come from Open Zeppelin, and we'll use Node.js/TS as a runtime instrumenting the Safe.

Update 1: It seems that Gnosis Safes are not yet available on Polygon zkEVM. We'll stick to Polygon PoS.
