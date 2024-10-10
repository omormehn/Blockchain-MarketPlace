const { ethers } = require("hardhat");
const { expect } = require("chai");

let Market;

before(async function () {
  Market = await ethers.getContractFactory("Market");
});

describe("Market", function () {
  it("Should create a product", async function () {
    const market = await Market.deploy(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    await market.waitForDeployment();

    const tx = await market.createProduct(
      "anoth Product",
      ethers.parseEther("0.00001"), // price in wei
      "This is a test product",
      "imageHash",
      "category"
    );

     await tx.wait();
     console.log("success");

      // Get the product ID
    const productCount = await market.countProduct();
    const productId = productCount - BigInt(1);

    // Buy the product
    const wallet = new ethers.Wallet(
      ""
    ); // Replace with a valid private key
    const buyer = wallet.connect(ethers.provider);
    const txBuy = await market.connect(buyer).buyProducts(1, {
      value: ethers.parseEther("0.00001"), // price in wei
    });

    await txBuy.wait();

    // Check if the product is bought
    const productOwner = await market.getItemsByOwner(productId);
    expect(productOwner).to.equal(wallet.address);
  });
});
