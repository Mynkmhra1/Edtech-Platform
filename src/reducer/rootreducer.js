import { configureStore } from '@reduxjs/toolkit';
import profileSlice from "./Slices/profileslice"
import authSlice from "./Slices/authSlice"
import cartSlice from "./Slices/cartSlice"
// import other reducers as needed

const store = configureStore({
  reducer: {
    profile: profileSlice,
    auth:authSlice,
    cart:cartSlice
    // other slices: otherReducer,
  },
});

export default store;
