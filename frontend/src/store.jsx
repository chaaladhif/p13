//configureStore de Redux Toolkit est utilisé pour créer le store en combinant les différents réducteurs dans rootReducer.
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// configuration par défaut de l'état de l'application
const initialState = {
    loginInfos: null,
    token: null,
    firstName: null,
    lastName: null,
    userName: null,
};
//createSlice est une fonction de Redux Toolkit qui simplifie la création des réducteurs et des actions
const userSlice = createSlice({
    name: "user",
    initialState,
    // reducer est une fonction qui reçoit l'état actuel et une action, et retourne le nouvel état.
    reducers: {
        setLoginInfos: (state, action) => {
            state.loginInfos = action.payload;
        },
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setUserLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setUsername: (state, action) => {
            //console.log('username:', action.payload);
            state.userName = action.payload;
        },
        setLogout: (state) => {
            state.loginInfos = null;
            state.token = null;
            state.firstName = null;
            state.lastName = null;
            state.userName = null;
        },
    },
});

const persistConfig = {
    key: "root",
    storage,
};

export const persistedReducer = persistReducer(
    persistConfig,
    userSlice.reducer
);
export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

export const {
    setLoginInfos,
    setUserToken,
    setUserFirstName,
    setUserLastName,
    setUsername,
    setLogout,
} = userSlice.actions;
