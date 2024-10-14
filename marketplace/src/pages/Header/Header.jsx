import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";

const Header = () => {
     const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center ">
      <div className="lg:pr-20 sm:pl-0 pt-4">
        <img
          src="./logo2.png"
          className="cursor-pointer w-36 lg:w-52 h-12 py-2 lg:ml-8  pl-2 md:pl-8 xl:pl-20"
          alt="logo"
          href="/"
          onClick={() => navigate(`/`)}
        />
      </div>
      <div className="absolute right-6 lg:right-36 cursor-pointer flex items-center gap-2 lg:gap-4 ">
        <IoCartSharp size={23} />
        <AiFillProduct size={23} onClick={()=> {
            navigate('/mine')
        }}/>
      </div>
    </div>
  );
}

export default Header