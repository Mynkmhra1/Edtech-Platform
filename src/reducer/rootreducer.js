import { configureStore } from '@reduxjs/toolkit';
import profileSlice from "./Slices/profileslice"
import authSlice from "./Slices/authSlice"
import cartSlice from "./Slices/cartSlice"
import courseSlice from "./Slices/courseSlice"
import viewCourseSlice from "./Slices/viewCourseSlice"
// import other reducers as needed

const store = configureStore({
  reducer: {
    profile: profileSlice,
    auth:authSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice
    // other slices: otherReducer,
  },
});

export default store;
