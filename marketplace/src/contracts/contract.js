import { ethers } from "ethers";
import dotenv from 'dotenv';

dotenv.config()

export const apiKey = process.env.API_KEY
export const apiSecret = process.env.API_SECRET

export const contractAddress = "0x0Ef8759087c79a3A76ff5913f02bB546a78DD396";

export const contractAbi = []


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


export const getImage = async (contract) => {
  try {
    const imageHash = await contract.getHash("Bank"); 
    return imageHash;
  } catch (error) {
    console.error("Error in getImage", error);
  }
};

export const loadOwnedProducts = async (contract) => {
   const signer = contract.signer;
   const activeWalletAddress = await signer.getAddress();
  try {
    const ownedProductId = await contract.getItemsByOwner(activeWalletAddress);
    const ownedItems = await Promise.all(
      ownedProductId.map((id) => contract.products(id))
    );
    return ownedItems;
  } catch(error) {
    if (error.code === "UNSUPPORTED_OPERATION") {
           console.error("Error code:", error.code);
           console.error("Error message:", error.message);
      console.error(
        "ENS is not supported on this network. Falling back to alternative approach.", error
      );
   
      
    } else {
      console.error("Error in load owned Product", error);
    }
  }
}

//create a product
export const listProducts = async (contract, name, price, description, category, cid) => {
    
  try {
    const tx = await contract.createProduct(
      name,
      ethers.utils.parseEther(price),
      description,
      cid,
      category
    );
    await tx.wait();
    loadProducts(contract);
  } catch (error) {
    console.error('Error in list product', error)
  }
} 

export const buyProducts = async (contract, productId, price, provider, account) => {
   const accountBalance = await provider.getBalance(account);
   const productPrice = ethers.utils.parseEther(price)
  try {
    if (accountBalance.lt(productPrice)) {
      throw new Error("Insufficient funds");
    }

    const tx = await contract.buyProducts(productId, {
      value: productPrice,
      gasLimit: 100000000000000
    });
    await tx.wait();

    // Update the product's purchased status
    const updatedProduct = await contract.getProductsByIds(productId);
    updatedProduct.status = 1;

    loadProducts(contract);
    loadOwnedProducts(contract);
  } catch (error) {
      console.error('Error in buy product', error)
    }
}

export const transferProduct = async (contract, productId, toAccount) => {
  try {
    const tx = await contract.transferProduct(productId, toAccount);
    await tx.wait();
    loadProducts(contract);
    loadOwnedProducts(contract);
  } catch (error) {
    console.error("Error in transfer product", error)
  }
}


  //  connectWallet().then(({ account, provider, signer, contract }) => {
  //     setProvider(provider);
  //     setSigner(signer);
  //     setContract(contract);
  //     setAccount(account);
  //     loadProducts(contract).then((product) => {
  //       setProducts(product);
  //     });

  //     loadOwnedProducts(contract, account).then((ownedItems) => {
  //       setOwnedProduct(ownedItems);
  //     });
  //     window.ethereum.on("accountChanged", async (account) => {
  //       setAccount(account[0]);
  //       setSigner(signer);
  //       setContract(contract);

  //       loadProducts(contract).then((product) => {
  //         setProducts(product);
  //       });

  //       loadOwnedProducts(contract, account).then((ownedItems) => {
  //         setOwnedProduct(ownedItems);
  //       });
  //     });
  //   });

