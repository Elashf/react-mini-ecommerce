import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  items: loadState(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },


    increment: (state, action) => {
      const id = action.payload;

      const product = state.items.find((item) => item.id === id);
      if (product.id === id) product.qty += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },


    decrement: (state, action) => {
      const id = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product.id === id && product.qty > 1) {
        product.qty -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    
    removeFromCart: (state, action) => {
      const product = action.payload;

      state.items = state.items.filter((item) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },


    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
