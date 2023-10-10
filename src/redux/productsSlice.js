import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const existingProduct = state.find(p => p.id === updatedProduct.id);

      if (existingProduct) {
        Object.assign(existingProduct, updatedProduct);
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state = state.filter(product => product.id !== productId);
      return state;
    },
  },
});

export const { addProduct, updateProduct,deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
