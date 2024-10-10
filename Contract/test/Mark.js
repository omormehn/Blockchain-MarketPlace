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
      "anoth",
      ethers.parseEther("0.001"),
      "This is a product",
      "imageHash",
      "category"
    );

     await tx.wait();
     console.log("success");

       const productCount = await market.countProduct();
       expect(productCount).to.equal(1n); 
       console.log(productCount);

   
  });
});
