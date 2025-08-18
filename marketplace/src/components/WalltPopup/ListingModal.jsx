import React, { useState } from "react";
import { ethers } from "ethers";
import { RiCloseLine } from "react-icons/ri";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

import {
  contractAbi,
  contractAddress,
  listProducts,
} from "../../contracts/contract";

const ListingModal = ({ setIssOpen }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const stuff = import.meta.env.VITE_PINATA_API_KEY;

  const handleUpload = async () => {
    console.log('clicked');
    const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
    const pinataApiSecret = import.meta.env.VITE_PINATA_API_SECRET;

    const formData = new FormData();
    formData.append("file", file);
    console.log("FormData:", formData);
    console.log("file:", file);
    setLoading(true);
    try {
      const fetchResponse = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataApiSecret,
          },
          body: formData,
        }
      );
      console.log("Fetch response:", fetchResponse);

      const response = await fetchResponse.json();
      console.log("File uploaded to IPFS:", response);
      const cid = response.IpfsHash;
      console.log("CID:", cid);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const name = document.getElementById("name").value;
        const price = document.getElementById("itemPrice").value;
        const desc = document.getElementById("itemDesc").value;
        const category = document.getElementById("category").value;

        if (name && price && desc && category != "") {
          try {
            await listProducts(contract, name, price, desc, category, cid);
            // toast.success("Product Listed Successfully");
            setIssOpen(false);
            // window.location.reload();
          } catch (error) {
            console.error("Error creating product:", error);
          }
        } else {
          setIssOpen(true);
          toast.error("Please fill all fields");
        }
      } catch (error) {
        toast.error("Error uploading file. Please try again.");
        console.error("Error creating product:", error);
      }
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
      console.error("Error uploading file to IPFS:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`darkBG `} onClick={() => setIssOpen(false)} />
      <div className="centered">
        <div className="modal xs:w-[80vw] lg:w-[70vw] h-[90vh] md:h-[70vh] lg:h-[80vh] ">
          <div className="flex justify-between gap-x-16 z-20">
            <h5 className="text-black font-bold">Add Listing</h5>
            <button className="" onClick={() => setIssOpen(false)}>
              <RiCloseLine size={23} style={{ marginBottom: "-3px" }} />
            </button>
          </div>

          <div className="flex flex-col gap-y-4 pt-10">
            <input
              id="name"
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
            <input
              id="itemPrice"
              type="number"
              placeholder="Price"
              step={0.01}
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
            <input
              id="itemDesc"
              type="text"
              placeholder="Description"
              required
              className="w-full p-2 border border-gray-400 rounded-md"
            />
            <select
              id="category"
              name="category"
              className="w-[16rem] xs:w-[18rem] sm:w-[29rem] md:w-[20rem] "
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home Goods">Home Goods</option>
            </select>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {loading ? (
              <PuffLoader
                color={"#123abc"}
                size={50}
                radius={1}
                aria-label="puff-loading"
                className="z-50"
              />
            ) : (
              <button className="primary-btn w-44 " onClick={handleUpload}>
                Create Product
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingModal;
