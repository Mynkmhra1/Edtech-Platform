import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token") || null;

const initialState = { token: storedToken, loading: false ,formData:{} }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set token on login (not needed if using cookies)
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Clear token on logout
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setFormData:(state,action)=>{
      state.formData = { ...state.formData, ...action.payload };
    },
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, logout, setLoading,setFormData } = authSlice.actions;
export default authSlice.reducer;
