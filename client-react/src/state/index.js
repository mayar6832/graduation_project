import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  pageType:"login"
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUpdatedUser: (state, action) => {
      state.user = action.payload.user;
    },
    setPageType: (state, action) => {
      state.pageType = action.payload
    }

  },
});

export const { setMode, setLogin, setLogout, setUpdatedUser ,setPageType} =
  authSlice.actions;
export default authSlice.reducer;