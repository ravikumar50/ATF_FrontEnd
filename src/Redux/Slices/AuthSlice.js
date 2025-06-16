import {createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") || false,
    role : localStorage.getItem('role') || "",
    data: (() => {
      const raw = localStorage.getItem("data");
      try {
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        return {};
      }
    })()
}


export const loginToAccount = createAsyncThunk("/auth/login", async(data,{rejectWithValue})=>{
    try{
        const promise = axiosInstance.post("user/login",data);

        const res = await toast.promise(promise,{
            loading : "Wait! Login your Account....",
            success: (res) => res?.data?.message || "Login successfully!",
            error: (err) => err?.response?.data?.message || "Failed to Login",
        });

        return res.data;
    }catch(err){
        return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
});

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder

           .addCase(loginToAccount.fulfilled, (state, action) => {
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
           })
    }
})

export const {} = authSlice.actions; 
export default authSlice.reducer;