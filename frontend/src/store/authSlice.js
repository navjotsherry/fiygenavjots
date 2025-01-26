import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import serverUrl from "../serverURL";

const initialState = {
  user: null,         // Stores logged-in user data
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${serverUrl}/login`, credentials,{withCredentials:true});
    localStorage.setItem("token",response.data.token)
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const reloadUserSlice = createAsyncThunk("auth/reloadUser", async (token, thunkAPI) => {
  try {
    const response = await axios.post(`${serverUrl}/myProfile`, token,{withCredentials:true});
    return response.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${serverUrl}/register`, credentials,{withCredentials:true});
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Async thunk for user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token")
    await axios.post(`${serverUrl}/logout`);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Reload User
      .addCase(reloadUserSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reloadUserSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(reloadUserSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
