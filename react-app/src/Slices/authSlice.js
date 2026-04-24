import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


export var registerUser = createAsyncThunk(
    "auth/register",
    async(userData,{rejectWithValue})=>{
        var response = await fetch("https://apis-8.onrender.com/api/userRoutes/register",{
            method : "POST",
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(userData)
        })
        var data = await response.json()
        if(!response.ok){
            return rejectWithValue(data.message || "registration failed")
        }
        return data 


    }
)

export var loginUser = createAsyncThunk(
    "auth/login",
    async(userData,{rejectWithValue})=>{
        var response = await fetch("https://apis-8.onrender.com/api/userRoutes/login",{
            method : "POST",
            headers : {
                "content-Type" : "application/json"
            },
            body : JSON.stringify(userData)
        })
        var data = await response.json()
        if(!response.ok){
            return rejectWithValue(data.message)
        }
        return data
    }
)


var authSlice = createSlice({
    name : "authSlice",
    initialState : {
        user : null,
        loading : false,
        error : null,
        token : null 
    },
    reducers : {
        logout : (state)=>{
            state.user = null
            state.token = null,
            state.error = null,
            state.loading = false 
            localStorage.removeItem("token")
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading = true
            state.error = null 
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(loginUser.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload
            state.token = action.payload.webToken
            localStorage.setItem("token",action.payload.webToken)
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error = action.payload
        })
    }
})

export default authSlice.reducer 




export const { logout } = authSlice.actions