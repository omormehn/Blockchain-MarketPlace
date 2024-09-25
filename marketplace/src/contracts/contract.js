import { ethers } from "ethers";

export const contractAddress = "0x39f9e9ACabF06C27c153faa62353226770046470"

export const contractAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "buyProducts",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "createCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
    ],
    name: "createProduct",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "purchased",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rating",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    name: "ProductCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "purchased",
        type: "bool",
      },
    ],
    name: "ProductPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rating",
        type: "uint256",
      },
    ],
    name: "rateProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "transferProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_newName",
        type: "string",
      },
    ],
    name: "updateCategory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allCategories",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "categories",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "countProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "purchased",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rating",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
        ],
        internalType: "struct Market.Product[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCategories",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getCategory",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "productIds",
            type: "uint256[]",
          },
        ],
        internalType: "struct Market.Category",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getItemsByOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
    ],
    name: "getProductsByCategory",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
    ],
    name: "getProductsByIds",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "purchased",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rating",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
        ],
        internalType: "struct Market.Product",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ownedItems",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "purchased",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "rating",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ratingCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] 



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
    console.error("error in loadProducts", error)
  }

}

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
export const listProducts = async (contract, name, price, description, category) => {
  try {
    const tx = await contract.createProduct(
      name,
      ethers.utils.parseEther(price),
      description,
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
    });
    await tx.wait();

    // Update the product's purchased status
    const updatedProduct = await contract.getProductsByIds(productId);
    updatedProduct.purchased = true;

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
