import {configureStore} from "@reduxjs/toolkit"

import authReducer from "../Slices/authSlice"


var Store = configureStore({
    reducer : {
        auth : authReducer
    }
})

export default Store 