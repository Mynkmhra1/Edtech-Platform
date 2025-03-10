import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null") || null , // Load stored user
  loading:false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user persistently
    },
    logoutProfile(state) {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from storage
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
