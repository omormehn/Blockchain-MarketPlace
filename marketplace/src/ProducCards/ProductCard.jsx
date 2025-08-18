import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  buyProducts,
  contractAbi,
  contractAddress,
  loadProducts,
} from "../contracts/contract";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  connectWallet,
  connectWallet2,
  connectWallet3,
} from "../Web3/connectWallet";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cart";





const ProductCard = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState("");
  const [provider, setProvider] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(null);
  const [searchParam] = useState(["name", "category"]);
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  function search(products) {
    const queryRes = products?.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) > -1
        );
      });
    });
    return queryRes;
  }

  useEffect(() => {
    async function init() {
      const provider = await connectWallet2();
      setProvider(provider);
      const signer = await connectWallet3();

      const account = await connectWallet();

      console.log("prov:", account);
      setAccount(account);
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setContract(contract);
      setLoading(true);

      const product = await loadProducts(contract);
      setProducts(product);

      setLoading(false);
      const accountBalance = await provider.getBalance(account[0]);
      setBalance(accountBalance);
    }
    init();
  }, []);

    const handleAddToCart = (product) => {
      dispatch(addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.imageHash,
        quantity: 1
      }));
    };

  const handleBuyProduct = async (product) => {
    const productPrice = product.price;

    if (balance <= productPrice) {
      toast.error("Insufficient Funds");
      return;
    }
    try {
      const rr = await buyProducts(
        contract,
        product.id,
        ethers.formatEther(product.price),
        provider,
        account
      );
      console.log("rr:", rr);
      const receipt = await provider.getTransactionReceipt(tx.hash)   
    } catch (error) {
      toast.error("Transaction Rejected");
    }
  };

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
      ) : search(products)?.length === 0 ? (
        <div className="pt-28 lg:pt-36">
          <h1>No Products, Please Refresh</h1>
        </div>
      ) : (
        search(products)?.map((product, index) => (
          <div
            key={index}
            className="flex justify-center flex-col m-5 hover:scale-105"
          >
            <img
              src={`https://ipfs.io/ipfs/${product?.imageHash}`}
              alt="Uploaded Image"
              className="w-80 h-60 lg:h-48 xs:w-[20rem] lg:w-80 rounded-t-lg"
            />
            <div className="card grid justify-center gap-5">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <h3 className="font-bold">
                  {ethers.formatEther(product.price)} GO
                </h3>
                <h3> {product.description}</h3>
                <small>{product.owner}</small>
              </div>
              <div className="">
                {product.owner.toLowerCase() === account[0].toLowerCase() ? (
                  <small className="text-left">Owned</small>
                ) : product.owner.toLowerCase() &&
                  product.isDeleted == false && account[0] ? (
                  <div className="flex flex-col gap-5 justify-center">
                    <button
                      className="secondary-btn"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      className="secondary-btn "
                      onClick={() => handleBuyProduct(product)}
                    >
                      Purchase
                    </button>
                  </div>
                ) : (
                  <small></small>
                )}
              </div>
            </div>

            {product.status == 1 && (
              <button
                onClick={() => {
                  confirmDelivery(contract, product.id);
                }}
              >
                Confirm delivery
              </button>
            )}
          </div>
        ))
      )}
    
    </div>
  );
};

export default ProductCard;
