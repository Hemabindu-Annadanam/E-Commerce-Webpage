import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state: any, action: any) {
      state.items = action.payload;
    },
    addToCart(state: any, action: any) {
      const existingItem = state.items.find((item: any) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state: any, action: any) {
      state.items = state.items.filter((item: any) => item.id !== action.payload);
    },
    clearCart(state: any) {
      state.items = [];
    },
    incrementQuantity(state: any, action: any) {
      const item = state.items[action.payload];
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },
    decrementQuantity(state: any, action: any) {
      const item = state.items[action.payload];
      if (item && (item.quantity || 1) > 1) {
        item.quantity = item.quantity - 1;
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;