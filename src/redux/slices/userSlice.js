import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axios";
import { axiosInstanceNoInterceptor } from "../../helpers/axios";



export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async ({ formValues, isLogin }, { rejectWithValue }) => {
        try {
            const endpoint = `/users/${isLogin ? "login" : "register"}`;
            const { data } = await axiosInstanceNoInterceptor.post(endpoint, formValues );
            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken);
            return data;
        }   catch (error) {
            return rejectWithValue(error?.response?.data?.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState:{
        userData: null,
        loading: false,
        error: null,
    },
    reducers:{
        cleanError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.userData = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken")
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.userData = action.payload.user;
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});



export const { cleanError, logout } = userSlice.actions
export const userReducer = userSlice.reducer;

