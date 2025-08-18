import React, { useState } from "react";
import ProductCard from "../ProducCards/ProductCard";
import Header from "./Header/Header";

const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");
   
  return (
    <div className="overflow-y-auto h-screen">
      <Header/>
      <div className="lg:container">
        <div className="font-bold text-xl lg:text-2xl ml-4  lg:ml-4 pt-5 ">
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
