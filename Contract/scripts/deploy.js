const hardhat = require("hardhat");

async function main() {

  const escrow = "0xd9145CCE52D386f254917e481eB44e9943F39138";

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
