import React, { useState } from "react";
import ProductCard from "../ProducCards/ProductCard";
import Header from "./Header/Header";

const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");
   
  return (
    <div>
      <Header/>
      <div className="pt-4 lg:pt-0 lg:container">
        <div className="font-bold text-xl lg:text-2xl ml-4 md:max-lg:ml-14 lg:ml-4 pt-5 ">
          <h1 className="">MarketPlace</h1>
        </div>
        <div className="pt-10">
          <ProductCard searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
};

export default Products;
