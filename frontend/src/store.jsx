import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
    loginInfos: null,
    token: null,
    firstName: null,
    lastName: null,
    userName: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginInfos: (state, action) => {
            state.loginInfos = action.payload;
        },
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        setUserFirstName: (state, action) => {
            // console.log('firstName:', action.payload);
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
