import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import { userSlice } from "./Slice/user";

const persistConfig = {
    key: 'gifter',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice.reducer)

export const store = configureStore({
    reducer: { user: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);