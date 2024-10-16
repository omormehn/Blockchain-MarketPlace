import { useState } from "react";
import SearchBar from "../Search/SearchBar.jsx";
import ProductCard from "../../ProducCards/ProductCard.jsx";



const Product = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="container">
      <div className="">
        <div className=" xs:ml-10 lg:pt-0 pt-28 px-2 xs:px-9 md:pl-28 xl:pl-44 bg-white">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
        </div>
        <div className="pt-10 lg:pt-0 ">
          <div className="font-bold text-xl lg:text-2xl lg:ml-10 pt-4 lg:pt-20 flex justify-start">
            <h1>Discover amazing products</h1>
          </div>
          <ProductCard searchQuery={searchQuery} />
        </div>
      </div>
    </section>
  );
};

export  {Product};
