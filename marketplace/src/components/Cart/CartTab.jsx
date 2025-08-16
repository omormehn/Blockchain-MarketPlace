import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../contracts/contract';
import { connectWallet4 } from '../../Web3/connectWallet';
import { ethers } from 'ethers';
import { changeQuantity } from '../../store/cart';
import { store } from '../../store';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);

    const dispatch = useDispatch();

    const handleMinusQuantity = (item) => {
      dispatch(changeQuantity({
        productId: Number(item.productId),
        quantity: Number(item.quantity) - 1
      }));
      
    }

       const handleAddQuantity = (item) => {
        console.log('click')
         dispatch(
           changeQuantity({
             productId: Number(item.productId),
             quantity: item.quantity + 1,
           })
         );
         console.log('unclick')
        //  console.log("som:--", productId);
       };


  return (
    <div className={`fixed top-0 right-0 pt-36 bg-gray-700 shadow-2xl 
      w-80 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500
        ${statusTab === false ? "translate-x-full" : ""}
      `}>
      <h2>Shopping Cart</h2>
      <div className='flex justify-center'>
        
          <div className=" ">
            {carts.map((item, index) => {
              return (
                <div className="bg-gray-400 h-24 w-72 rounded-lg">
                  <div
                    key={index}
                    className="flex gap-2 justify-center items-center pt-4"
                  >
                    <img
                      src={`https://ipfs.io/ipfs/${item.image}`}
                      alt="imag"
                      className="w-16 h-16 bg-transparent"
                    />
                    <h1>{item.name}</h1>
                    <h1 className="font-bold">{item.price} GO</h1>
                    <div className="flex items-center gap-3">
                      <button
                        className="bg-gray-200 rounded-full w-6 h-6 text-white"
                        onClick={() => handleMinusQuantity(item)}
                      >
                        -
                      </button>
                      <h1>{item.quantity}</h1>
                      <button
                        onClick={() => handleAddQuantity(item)}
                        className="bg-gray-200 rounded-full w-6 h-6 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          
        </div>
      </div>
    </div>
  );
}

export default CartTab