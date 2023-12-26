import { configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore
} from "redux-persist";

import { userSlice } from "./Slice/user";

export const store = configureStore({
    reducer: { user: userSlice.reducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export let persistor = persistStore(store);