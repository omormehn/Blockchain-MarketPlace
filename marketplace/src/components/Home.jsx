import { useEffect, useState } from "react";
import {
  buyProducts,
  contractAbi,
  contractAddress,
  listProducts,
  loadOwnedProducts,
  loadProducts,
  transferProduct,
} from "../contracts/contract";
import { ethers } from "ethers";

const Home = () => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [products, setProducts] = useState([]);
  const [ownedProduct, setOwnedProduct] = useState([]);
  

  useEffect(() => {
    async function init() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log("MetaMask account changed:", accounts[0]);
        setAccount(accounts[0]);

        window.location.reload();

        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        setContract(contract);
        console.log(contract);
      });

      const account = await provider.send("eth_requestAccounts", []);
      setAccount(account[0]);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      setContract(contract);

      const products = await loadProducts(contract);
      setProducts(products);

      const ownedProduct = await loadOwnedProducts(contract);
      setOwnedProduct(ownedProduct);
    }
    init();
  }, []);

  return (
    <div>
      Market Place
      <br />
      {account}
      <br />
      <div>
        <h1>List Item</h1>
        <input type="text" id="itemName" placeholder="name" />
        <input type="number" id="itemPrice" placeholder="price" step={0.01} />
        <input type="text" id="itemDesc" placeholder="description" />
        <select id="category" name="category">
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home Goods">Home Goods</option>
        </select>
        <button
          onClick={() =>
            listProducts(
              contract,
              document.getElementById("itemName").value,
              document.getElementById("itemPrice").value,
              document.getElementById("itemDesc").value,
              document.getElementById("category").value
            )
          }
        >
          Create Product
        </button>
      </div>
      {/* Items */}
      <h2>Items for sale</h2>
      <div>
        {products.map((product, index) => (
          <div key={index} className="card">
            <h3>Name: {product.name}</h3>
            <h3>Price: {ethers.utils.formatEther(product.price)}</h3>
            <h3>Desc: {product.description}</h3>
            <h3>Cat: {product.category}</h3>
            <h4>Owner: {product.owner}</h4>
            {!product.purchased &&
              product.owner.toLowerCase() !== account.toLowerCase() && (
                <button
                  onClick={() =>
                    buyProducts(
                      contract,
                      product.id,
                      ethers.utils.formatEther(product.price),
                      provider,
                      account
                    )
                  }
                >
                  Purchase
                </button>
              )}
          </div>
        ))}
      </div>
      <h2>My Items </h2>
      <div className="">
        {ownedProduct.map((product, index) => (
          <div key={index} className="card">
            <h3>Name: {product.name}</h3>
            <h3>Price: {ethers.utils.formatEther(product.price)}</h3>
            <h3>Desc: {product.description}</h3>
            <h3>Cat: {product.category}</h3>
            <h4>Owner: {product.owner}</h4>

            <input
              type="text"
              id={`transferAddress${product.id}`}
              placeholder="Transfer to Address"
            />
            <button
              onClick={() => {
                transferProduct(
                  contract,
                  product.id,
                  document.getElementById(`transferAddress${product.id}`).value
                );
              }}
            >
              Transfer Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
