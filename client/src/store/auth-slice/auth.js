import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      formData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/check-auth", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/auth/check-auth",
    { withCredentials: true }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.get("http://localhost:8000/api/auth/logout", {
    withCredentials: true,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action?.payload?.success ? action?.payload?.user : null;
      state.isAuthenticated = action?.payload?.success;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action?.payload?.success ? action?.payload?.user : null;
      state.isAuthenticated = action?.payload?.success;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      console.error("Logout failed:", action.error);
    });
  },
});
export default authSlice.reducer;
