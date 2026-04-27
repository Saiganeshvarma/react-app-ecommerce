import {configureStore} from "@reduxjs/toolkit"

import authReducer from "../Slices/authSlice"

import productReducer from "../Slices/productSlice"



var Store = configureStore({
    reducer : {
        auth : authReducer,
        products : productReducer
    }
})

export default Store 