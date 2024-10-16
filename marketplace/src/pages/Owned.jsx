import React from "react";
import ProductCard from "../ProducCards/OwnedProdCard";



const OwnedProducts = () => {
  return (
    <div>
      <h1 className="container font-bold pt-24">Owned Products</h1>
      <div className="flex">
        <ProductCard />
      </div>
    </div>
  );
};

export default OwnedProducts;
