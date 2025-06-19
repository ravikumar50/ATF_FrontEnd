import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import counterSliceReducer from "./Slices/CounterSlice";
const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        counter : counterSliceReducer
    },
    devTools: true,
})

export default store;