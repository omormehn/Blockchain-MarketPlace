const hardhat = require("hardhat");

async function main() {
  const escrow = process.env.ESCROW_ADDRESS;
  if (!escrow) throw new Error("Set ESCROW_ADDRESS in .env");

  const MarketPlace = await hardhat.ethers.getContractFactory("Market");
  const marketPlace = await MarketPlace.deploy(escrow);

  await marketPlace.waitForDeployment();
  console.log(" Deployed to: ", marketPlace.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
