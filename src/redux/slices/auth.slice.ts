import { createSlice } from "@reduxjs/toolkit";
import { register, logIn } from "../operations/auth.operations";

interface User{
    name:string|null
    emial:string|null
}
interface AuthSlice{
    user:User
    token:string|null
    isLoggedIn:boolean
    isLoading:boolean
    error: string|null
}


const initialState = {
    user : {name:null,email:null },
    token:null,
    isLoggedIn:false,
    isLoading:false,
    error:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers: builder => {
        builder
        .addCase(register.pending, state => {
            state.isLoading = true;
        }))
        .addCase(register.fulfilled, (state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn=true;
            state.isLoading=false;
            state.error = null;
        })
        .addCase(register.rejected,(state,action) => {
            state.isLoading=false
            state.error = action.payload.error;
        })
    }
})