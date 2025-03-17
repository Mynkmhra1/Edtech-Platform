
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// Retrieve totalItems from localStorage (if available)
const storedTotalItems = localStorage.getItem("totalItems")
  ? JSON.parse(localStorage.getItem("totalItems"))
  : 0;

const Storedtotal=  localStorage.getItem("total")
? JSON.parse(localStorage.getItem("total"))
: 0;

const storedCart= localStorage.getItem("total")
? JSON.parse(localStorage.getItem("total"))
: [];

const initialState = {
  totalItems: storedTotalItems,total:Storedtotal,cart:storedCart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course=action.payload
      const index=state.cart.findIndex((item)=>item._id===course._id)

      if(index>=0){
        toast.error("course already in cart");
        return;
      }

      state.totalItems++;
      state.cart.push(course);
      state.total+=course.price;

      // update localStorage so changes persist
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("cart", JSON.stringify(state.cart));

      toast.success("course added successfully")

    },
    removeFromCart:(state,action)=>{
      const course =action.payload
      state.cart= state.cart.filter((item)=>item._id!==course._id)
      
      state.total=state.total-course.price;
      state.totalItems--;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      localStorage.setItem("total", JSON.stringify(state.total));
      
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    }
  },
});


export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;