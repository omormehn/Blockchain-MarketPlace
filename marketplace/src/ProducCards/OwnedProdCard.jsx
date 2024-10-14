import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  contractAbi,
  contractAddress,
  loadOwnedProducts,
 } from "../contracts/contract";
import { PuffLoader } from "react-spinners";
import { connectWallet3 } from "../Web3/connectWallet";

const ProductCard = () => {
  const [owned, setOwned] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
     
      const signer = await connectWallet3();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      
      setLoading(true);

      const ownedProduct = await loadOwnedProducts(contract);
      setOwned(ownedProduct);

      setLoading(false);
     
    }
    init();
  }, []);
 

  return (
    <div className="flex justify-center   md:flex-wrap ">
      {loading ? (
        <div className="pt-10 md:pt-20 lg:pt-24">
          <PuffLoader
            color={"#123abc"}
            size={130}
            radius={1}
            aria-label="puff-loading"
            className="z-50"
          />
        </div>
      ) : (
        owned.map((product, index) => (
          <div
            key={index}
            className="flex justify-center flex-col m-5 hover:scale-105"
          >
            <img
              src={`https://ipfs.io/ipfs/${product.imageHash}`}
              alt="Uploaded Image"
              className="w-72 h-60 lg:h-48 xs:w-[19rem] lg:w-80 rounded-t-lg"
            />
            <div className="card grid gap-5">
              <div>
                <h3>{ethers.formatEther(product.price)} GO</h3>
                <h3>{product.description}</h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCard;
