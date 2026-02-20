# Smart Contract Deployment

## Prerequisites
- Hardhat installed
- MetaMask wallet with Polygon Amoy testnet MATIC
- Alchemy API key

## Setup
Already configured in root directory.

## Compile
```bash
npx hardhat compile
```

## Deploy to Polygon Amoy
```bash
npm run deploy
```

## Verify on PolygonScan
```bash
npx hardhat verify --network amoy DEPLOYED_CONTRACT_ADDRESS
```

## Get Test MATIC
https://faucet.polygon.technology/
Select: Polygon Amoy
