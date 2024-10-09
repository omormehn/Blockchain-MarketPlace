const hardhat = require("hardhat");

async function main() {

  const escrow = "0x784aa1D25d0796fa6583D904507772115A2DD4C5";

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
