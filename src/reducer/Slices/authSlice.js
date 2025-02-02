import { createSlice } from "@reduxjs/toolkit";

// Retrieve token from localStorage (if available)
const storedToken = localStorage.getItem("token") || null;

const initialState = {
  token: "ss",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set token on login
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    // Clear token on logout
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
