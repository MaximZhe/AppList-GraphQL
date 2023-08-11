import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICardRepositoryProps, IInitialState } from "../../types/types";


const initialState: IInitialState = {
    datas: [
        {
            node: {
                id: 0,
                owner: {
                    avatarUrl: "",
                    login: ""
                },
                name: "",
                stargazers: {
                    totalCount: 0
                },
                primaryLanguage: {
                    name: ""
                },
                description: "",
                pushedAt: "",
                url: ""
            }
        },
    ],
    singleRepoData: {
        node: {
            id: 0,
            owner: {
                avatarUrl: "",
                login: ""
            },
            name: "",
            stargazers: {
                totalCount: 0
            },
            primaryLanguage: {
                name: ""
            },
            description: "",
            pushedAt: "",
            url: ""
        }
    },
}

export const datasSlice = createSlice({
    name:'datas',
    initialState,
    reducers: {
        setDatas:(state, action: PayloadAction<ICardRepositoryProps[]>) => {
            state.datas= action.payload
        },
        setSingleRepoData:(state, action: PayloadAction<ICardRepositoryProps>) => {
            state.singleRepoData = action.payload
        }
    }
})

export const {setDatas,setSingleRepoData} = datasSlice.actions
export default datasSlice.reducer