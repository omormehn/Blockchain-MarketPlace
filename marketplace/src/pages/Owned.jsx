import React from 'react'
import ProductCard from '../ProducCards/OwnedProdCard'
import Header from './Header/Header';

const OwnedProducts = () => {
  return (
    <div>
      <Header/>
      <div>
        <h1 className='container font-bold'>Owned Products</h1>
        <ProductCard />
      </div>
    </div>
  );
}

export default OwnedProducts