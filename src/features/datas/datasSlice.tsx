import {createSlice } from "@reduxjs/toolkit";

interface IState {
    datas: [],
    oneRepo: {
        owner:string,
        name: string
    }
}
const initialState: IState = {
    datas: [],
    oneRepo: {
        owner:'',
        name:''
    }
}

export const datasSlice = createSlice({
    name:'datas',
    initialState,
    reducers: {
        setDatas:(state, action) => {
            state.datas= action.payload
        },
        setOneRepoOwner:(state, action) => {
            state.oneRepo.owner= action.payload
        },
        setOneRepoName:(state, action) => {
            state.oneRepo.name = action.payload
        }
    }
})

export const {setDatas, setOneRepoOwner,setOneRepoName} = datasSlice.actions
export default datasSlice.reducer