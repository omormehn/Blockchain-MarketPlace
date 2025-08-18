import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  contractAbi,
  contractAddress,
  loadOwnedProducts,
  transferProduct,
 } from "../contracts/contract";
import { PuffLoader } from "react-spinners";
import { connectWallet3 } from "../Web3/connectWallet";
import ListingModal from "../components/WalltPopup/ListingModal";
import { MdDelete } from "react-icons/md";

const ProductCard = () => {
  const [owned, setOwned] = useState([]);
  const [loading, setLoading] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ contract, setContract ] = useState('');

  useEffect(() => {
    async function init() {
     
      const signer = await connectWallet3();
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setContract(contract);
      
      setLoading(true);

      const ownedProduct = await loadOwnedProducts(contract);
      setOwned(ownedProduct);

      setLoading(false);
     
    }
    init();
  }, []);
 

  return (
    <div className="flex justify-center flex-col  gap-5 md:flex-wrap ">
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
      ) : owned?.length === 0 ? (
        <div className="pt-10 md:pt-20 lg:pt-24 text-center">
          <h2>No owned items found.</h2>
        </div>
      ) : (
        owned?.map((product, index) => (
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
            <div className="flex pt-5 gap-4">
              <input
                type="text"
                id={`transferAddress${product.id}`}
                placeholder="Address"
                required
                className="border-slate-500 border-2 rounded-lg px-2"
              />
              <button
                className="primary-btn"
                onClick={() => {
                  transferProduct(
                    contract,
                    product.id,
                    document.getElementById(`transferAddress${product.id}`)
                      .value
                  );
                  window.location.reload();
                }}
              >
                Transfer Product
              </button>
              <div>
                {product.isDeleted == false ? (
                  <button
                    onClick={() => {
                      deleteProduct(contract, product.id);
                    }}
                  >
                    
                    <MdDelete />
                  </button>
                ) : (
                  product.isDeleted == true && <small>del.</small>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      <div className="flex justify-center pb-4">
        <button onClick={() => setIsModalOpen(true)} className="primary-btn">
          Add Product
        </button>
      </div>

      {isModalOpen && <ListingModal setIssOpen={setIsModalOpen} />}
    </div>
  );
};

export default ProductCard;
