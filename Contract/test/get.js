const { ethers } = require("hardhat");
const { expect } = require("chai");

let Market;

before(async function () {
  Market = await ethers.getContractFactory("Market");
});

describe("Market", () => {
  it("Should  confirm delivery of items", async function () {
    const market = await Market.deploy(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    await market.waitForDeployment();

    await market.createProduct(
      "anoth",
      ethers.parseEther("0.001"), // price in wei
      "This is a product",
      "imageHash",
      "category"
    );
    await market.createProduct(
      "car",
      ethers.parseEther("0.002"), // price in wei
      "This is a car",
      "imageHash",
      "elec"
    );
    await market.createProduct(
      "prod 3",
      ethers.parseEther("0.00003"), // price in wei
      "This is a product 3",
      "imageHash3",
      "elec"
    );

    // Get the product ID
    const productCount = await market.countProduct();
    const productId = productCount - BigInt(1);

    // Buy the product
    const wallet = new ethers.Wallet(
      "WALLET PRIVATE KEY"
    );
    const buyer = wallet.connect(ethers.provider);
    const txBuy = await market.connect(buyer).buyProducts(productId, {
      value: ethers.parseEther("0.002"), // price in wei
    });

    await txBuy.wait();
    console.log("Buy success");
    const tes = await market.getItemsByOwner(wallet);
    console.log(tes);

    const products = await market.getAllProducts();
    const product = await market.getProductsByIds(productId);
    console.log("prod:", product);
    expect(product.id).to.equal(productId);
    expect(product.status).to.equal(1);

    console.log("Products:");
    products.forEach((product, index) => {
      console.log(`Product #${index + 1}:`);
      console.log(`  ID: ${product.id}`);
      console.log(`  Name: ${product.name}`);
      console.log(`  Price: ${product.price}`);
      console.log(`stat: ${product.status}`)
    
    });
    
    const updatedProduct = await market.getProductsByIds(productId);

    // Confirm delivery
    try {
        const txConfirm = await market.connect(buyer)
          .confirmDelivery(productId);
        await txConfirm.wait();
    } catch (error) {
        console.error("reverted:", error)
    }
   

    console.log("Confirm delivery success", product.id);
    console.log("stat:" , updatedProduct.status)
    console.log("Updated product:", updatedProduct);
   


    // Check that the product status has been updated to PurchaseStatus.Delivered
    expect(updatedProduct.status).to.equal(2);

    // Check that the productDelivered event has been emitted
    expect(product.event.productDelivered).to.not.be.undefined;
  });

});
