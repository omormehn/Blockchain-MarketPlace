import { ethers } from "ethers";

export const contractAddress = "";

export const contractAbi = [];

export const loadProducts = async (contract) => {
  try {
    const countProduct = await contract.countProduct();
    let products = [];
    for (let i = 1; i <= countProduct; i++) {
      const product = await contract.products(i);
      products.push(product);
    }
    return products;
  } catch (error) {
    console.error("error in loadProducts", error);
  }
};

export const loadOwnedProducts = async (contract) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();
  const activeWalletAddress = (await signer).getAddress();
  try {
    const ownedProductId = await contract.getItemsByOwner(activeWalletAddress);
    const ownedItems = await Promise.all(
      ownedProductId.map((id) => contract.products(id))
    );
    return ownedItems;
  } catch (error) {
    console.error("Error in load owned Product", error);
  }
};

//create a product
export const listProducts = async (
  contract,
  name,
  price,
  description,
  category,
  cid
) => {
  try {
    const tx = await contract.createProduct(
      name,
      ethers.parseEther(price),
      description,
      cid,
      category
    );
    await tx.wait();
    loadProducts(contract);
  } catch (error) {
    console.error("Error in list product", error);
  }
};

export const buyProducts = async (
  contract,
  productId,
  price,
  provider,
  account,
) => {
  const accountBalance = await provider.getBalance(account);
  const productPrice = ethers.parseEther(price);
  try {
    if (accountBalance <= productPrice) {
      throw new Error("Insufficient funds");
    }

    const tx = await contract.buyProducts(productId, {
      value: productPrice,
      gasLimit: 30000000,
    });
    await tx.wait();
    
    window.location.reload();

    loadProducts(contract);
    loadOwnedProducts(contract);
  } catch (error) {
    console.error("Error in buy product", error);
  }
};
export const confirmDelivery = async (contract, productId) => {
  try {
    const tx = await contract.confirmDelivery(productId);
    await tx.wait();
    loadProducts(contract);
  } catch (error) {
    console.error("Error in confirmDelivery", error);
  }
};

export const transferProduct = async (contract, productId, toAccount) => {
  try {
    const tx = await contract.transferProduct(productId, toAccount);
    await tx.wait();
    loadProducts(contract);
    loadOwnedProducts(contract);
  } catch (error) {
    console.error("Error in transfer product", error);
  }
};

export const deleteProduct = async (contract, productId) => {
  try {
    const tx = await contract.deleteProduct(productId);
    await tx.wait();
    loadProducts(contract);
    loadOwnedProducts(contract);
  } catch (error) {
    console.error("Error in delete product", error);
  }
};
