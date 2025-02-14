import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // initial state with no user data
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Set the user (for example, on login)
    setUser(state, action) {
      state.user = action.payload;
    },

    logoutProfile: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from storage
    },
  },
});

export const { setUser, logoutProfile } = profileSlice.actions;
export default profileSlice.reducer;
