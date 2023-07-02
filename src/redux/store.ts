import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage' ;

import  datasSlice  from "./slice/datasSlice";

const rootReduser = combineReducers({
    datas:datasSlice
})
const persistConfig = {
    key: 'root',
    storage,
  }

const persisterReducer= persistReducer(persistConfig, rootReduser)
export const store = configureStore({
    reducer: persisterReducer,
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistore = persistStore(store)


