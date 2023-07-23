import {createSlice } from "@reduxjs/toolkit";

interface IState {
    datas: [],
    singleRepoData: []
}
const initialState: IState = {
    datas: [],
    singleRepoData: []
}

export const datasSlice = createSlice({
    name:'datas',
    initialState,
    reducers: {
        setDatas:(state, action) => {
            state.datas= action.payload
        },
        setSingleRepoData:(state, action) => {
            state.singleRepoData = action.payload
        }
    }
})

export const {setDatas,setSingleRepoData} = datasSlice.actions
export default datasSlice.reducer