const hardhat = require("hardhat");

async function main() {

  const escrow = "0x610178dA211FEF7D417bC0e6FeD39F05609AD788";

  const MarketPlace = await hardhat.ethers.getContractFactory('Market')
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
