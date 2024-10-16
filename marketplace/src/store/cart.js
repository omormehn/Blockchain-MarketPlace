import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

const initialState = {
    items: [],
    statusTab: false
  }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const {productId, name, price, image, quantity} = action.payload;
      
         const indexProductId = (state.items).findIndex(
           item => item.productId === productId
         );
         if (indexProductId >= 0) {
           state.items[indexProductId].quantity += 1;
              state.items[indexProductId].price =
                ethers.formatEther(price) * state.items[indexProductId].quantity;
         } else {
           state.items.push({ productId, name, price, image, quantity}); 
         }
  

          console.log("Adding item to cart:", action.payload);
          console.log("Current cart state:", state.items);
      
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    changeQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
        const indexProductId = state.items.findIndex(
          (item) => item.productId === productId
        );
         console.log("id", indexProductId);
      if (indexProductId <= 0) {
       console.log('q', quantity)
        // Check if indexProductId is a valid index
        if (quantity > 0) {
          state.items[indexProductId].quantity = quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
    toggleStatusTab(state) {
      if(state.statusTab === false) {
        state.statusTab = true;
      } else {
        state.statusTab = false;
      }
    }
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, changeQuantity, toggleStatusTab } = cartSlice.actions;