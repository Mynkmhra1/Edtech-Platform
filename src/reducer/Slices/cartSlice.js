
import { createSlice } from '@reduxjs/toolkit';

// Retrieve totalItems from localStorage (if available)
const storedTotalItems = localStorage.getItem("totalItems")
  ? JSON.parse(localStorage.getItem("totalItems"))
  : 0;

const initialState = {
  totalItems: storedTotalItems,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      // Optionally update localStorage so changes persist
      localStorage.setItem("totalItems", JSON.stringify(action.payload));
    },
  },
});


export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
