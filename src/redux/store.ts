import { configureStore } from "@reduxjs/toolkit";


import  datasSlice  from "../features/datas/datasSlice";
import paginationSlice from "./slice/paginationSlice";
export const store = configureStore({
    reducer: {
        datas:datasSlice,
        currentPage:paginationSlice
    },
    devTools:true
})


