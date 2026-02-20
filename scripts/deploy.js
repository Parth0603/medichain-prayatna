const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying MediChain contract to Polygon Amoy...");

  const MediChain = await hre.ethers.getContractFactory("MediChain");
  const medichain = await MediChain.deploy();

  await medichain.waitForDeployment();

  const address = await medichain.getAddress();

  console.log("\n✅ MediChain deployed successfully!");
  console.log("📍 Contract Address:", address);
  console.log("\n📌 SAVE THIS ADDRESS - Add to your .env files:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Root .env:");
  console.log("  CONTRACT_ADDRESS=" + address);
  console.log("\nbackend/.env:");
  console.log("  CONTRACT_ADDRESS=" + address);
  console.log("\nfrontend/.env:");
  console.log("  VITE_CONTRACT_ADDRESS=" + address);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n🔍 Verify on Amoy PolygonScan:");
  console.log("https://amoy.polygonscan.com/address/" + address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
