const hardhat = require("hardhat");

async function main() {

  const MarketPlace = await hardhat.ethers.getContractFactory('Market')
  const marketPlace = await MarketPlace.deploy();

  await marketPlace.waitForDeployment();
  console.log(" Deployed to: ", marketPlace.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
