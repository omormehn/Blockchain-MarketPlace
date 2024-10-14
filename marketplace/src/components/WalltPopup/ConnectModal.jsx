import { useState } from 'react';
import { connectWallet } from '../../Web3/connectWallet';
import './modal.css';
import { RiCloseLine } from "react-icons/ri";  
import { PuffLoader } from "react-spinners"; 
import { toast } from 'react-toastify';


// eslint-disable-next-line react/prop-types
const Modal = ({ setIsOpen, onAccountChange }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

      const handleConnectClick = async () => {
        
        console.log("handleConnectClick called");
        setLoading(true);
        setError(null);
        try {
          const account = await connectWallet();
          onAccountChange(account);
          setLoading(false)
          setIsOpen(false)
        } catch (error) {
          setError(error.message);
          setIsOpen(false)
          setLoading(false);
          console.error(error);
          toast.error("Something Went Wrong")
        }
      };
      

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="flex justify-between gap-x-16 z-20">
            <h5 className="text-black font-bold">Select Wallet</h5>
            <button className="" onClick={() => setIsOpen(false)}>
              <RiCloseLine size={23} style={{ marginBottom: "-3px" }} />
            </button>
          </div>

          <div className="flex justify-center  pt-10">
            {loading ? (
              <PuffLoader
                color={"#123abc"}
                size={80}
                radius={1}
                aria-label="puff-loading"
                className='z-50'
              />
            ) : error ? (
              <div className="flex flex-col gap-y-2">
                <span className="text-red-500 ">Something went wrong</span>
                <button
                  className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1.5 px-2 rounded text-base"
                  onClick={handleConnectClick}
                >
                  Retry
                </button>
              </div>
            ) : (
             <div className='flex justify-center gap-2 '>
                <img src="metamask.png" alt="" className='w-12 pr-2' />
                <button className="primary-btn" onClick={handleConnectClick}>
                  Metamask
                </button>
             </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

 
};

export default Modal;
