import React from "react";
import { FiMenu } from "react-icons/fi";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useEffect, useState } from "react";
import { truncateAddress } from "../../utils/TRUNCATE.JS";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { IoCartSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import ListingModal from "../WalltPopup/ListingModal.jsx";
import Modal from "../WalltPopup/ConnectModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusTab } from "../../store/cart.js";

const NavbarMenu = [
  {
    id: 1,
    name: "Explore",
    url: '/products'
  },
  {
    id: 2,
    name: "Listings",
    url: '/mine'
  }
]



const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [issOpen, setIssOpen] = useState(false);
  const [ totalQuant, setTotalQuant ] = useState(0);
  const dispatch = useDispatch();
  const carts = useSelector(store => store.cart.items);
  console.log(walletAddress, "wallet address");

  useEffect(() => {
    let total = 0;
    carts.forEach(item => total += item.quantity);
    setTotalQuant(total)
  })

  const OpenCart = () =>{
    dispatch(toggleStatusTab())
  }
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  const handleAccountChange = (account) => {
    setWalletAddress(account);
  };
  const conn = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      handleAccountChange(accounts[0]);
    } catch (error) {
      if (error.code === -32002) {
        toast.error("Connection request rejected. Please try again.");
      } else {
        console.error("Error connecting to wallet:", error);
        toast.error(
          "An error occurred while connecting to wallet. Connection Rejected"
        );
      }
    }
  };

  //account change
  useEffect(() => {
    conn();
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setWalletAddress(null);
        toast.info("Account Disconnected");
      } else {
        setWalletAddress(accounts[0]);
        console.log("MetaMask account changed:", accounts[0]);
        toast.success("Account changed to: " + accounts[0]);
        window.location.reload();
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  //theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  //  navbar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".navbar")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <section className="fixed w-full top-0 z-50 overflow-hidden bg-white shadow-md pb-4">
      <nav id="navbar">
        <div className="flex items-center justify-between lg:justify-around  xs:gap-x-44 sm:gap-x-32 md:gap-x-[15rem] lg:gap-0 ">
          {/* Group 1 */}
          <div className="hidden lg:flex items-center gap-8">
            {walletAddress ? (
              <div className=" lg:block pt-4 ">
                {issOpen &&
                  createPortal(
                    <ListingModal setIssOpen={setIssOpen} />,
                    document.body
                  )}
                <button
                  className="primary-btn "
                  onClick={() => setIssOpen(true)}
                >
                  Add Listing
                </button>
              </div>
            ) : (
              ""
            )}
            <h1
              className="font-bold text-lg pt-2 cursor-pointer"
              onClick={() => {
                window.location.href = "/products";
              }}
            >
              Explore
            </h1>
          </div>

          {/* Group 2 */}
          <div className="lg:pr-20 sm:pl-0 pt-4">
            <img
              src="./logo2.png"
              className="cursor-pointer w-30 h-12 py-2 lg:ml-8 xl:w-48 pl-2 md:pl-8 xl:pl-20"
              alt="logo"
              onClick={()=> {
                window.location.href = '/'
              }}
            />
          </div>

          {/* DESKTOP MENU Group 3 */}
          <div className="list-none hidden items-center lg:flex justify-end lg:flex-row gap-4 ">
            <li>
              <AiFillProduct size={23} className="cursor-pointer" onClick={() => {
                window.location.href = "/mine";
              }} />
            </li>
           
            <div className="flex justify-center items-center rounded-full bg-gray-300 relative h-10 w-10">
              <IoCartSharp size={23} className="cursor-pointer" onClick={OpenCart}/>
              <span className="absolute top-2/3 right-1/2 text-sm text-center flex justify-center items-center  rounded-full bg-red-500 h-5 w-5">
              {totalQuant}
              </span>
            </div>
            <div>
              {isOpen &&
                createPortal(
                  <Modal
                    setIsOpen={setIsOpen}
                    onAccountChange={handleAccountChange}
                  />,
                  document.body
                )}

              {walletAddress ? (
                <span className="bg-slate-600 hover:bg-slate-900 text-white font-bold py-1.5 px-5 rounded ">
                  {truncateAddress(walletAddress)}
                </span>
              ) : (
                <button
                  className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1.5 px-5 rounded text-base"
                  onClick={() => setIsOpen(true)}
                >
                  Connect Wallet
                </button>
              )}
            </div>
            {theme == "dark" ? (
              <BiSolidSun
                className="text-2xl text-black"
                onClick={toggleTheme}
              />
            ) : (
              <BiSolidMoon
                className="text-2xl z-50 text-black "
                onClick={toggleTheme}
              />
            )}
          </div>
          {/* MOBILE MENU */}
          <div className="flex flex-row lg:hidden navbar ">
            <FiMenu
              className="text-3xl cursor-pointer mr-3"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div>
                <div
                  className="fixed top-20 left-0 right-0 text-black
                               bg-white dark:bg-gray-900  shadow-md
                              rounded-b-xl py-10 z-0"
                >
                  <ul
                    className="flex flex-col
                        items-center gap-4 text-xl font-semibold"
                  >
                    {NavbarMenu.map((menu) => (
                      <li >
                        <a
                          href={menu.url}
                          className="px-2 py-4 md:py-6 inline-block cursor-pointer"
                        >
                          {menu.name}
                        </a>
                      </li>
                    ))}
                    <div className="flex py-4">
                      <a className=" px-3  ">Theme</a>
                      {theme == "dark" ? (
                        <BiSolidSun
                          className="text-2xl dark:text-white"
                          onClick={toggleTheme}
                        />
                      ) : (
                        <BiSolidMoon
                          className="text-2xl "
                          onClick={toggleTheme}
                        />
                      )}
                    </div>
                    <div>
                      {isOpen &&
                        createPortal(
                          <Modal
                            setIsOpen={setIsOpen}
                            onAccountChange={handleAccountChange}
                          />,
                          document.body
                        )}

                      {walletAddress ? (
                        <span className="bg-slate-600 hover:bg-blue-900 text-white font-bold py-1.5 px-5 rounded text-base">
                          {truncateAddress(walletAddress)}
                        </span>
                      ) : (
                        <button
                          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1.5 px-5 rounded text-base"
                          onClick={() => setIsOpen(true)}
                        >
                          Connect Wallet
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-8">
                      {walletAddress ? (
                        <div className=" lg:block pt-4 ">
                          {issOpen &&
                            createPortal(
                              <ListingModal setIssOpen={setIssOpen} />,
                              document.body
                            )}
                          <button
                            className="primary-btn"
                            onClick={() => setIssOpen(true)}
                          >
                            Add Listing
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
