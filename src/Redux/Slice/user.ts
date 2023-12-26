import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    status: {
        isFetching: false,
    },
    data: {
        first_name: '',
        last_name: '',
        email: '',
        isAuthenticated: false
    },
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.data.first_name = action.payload.first_name,
                state.data.last_name = action.payload.last_name,
                state.data.email = action.payload.email
        },
        setIsAuthenticated: (state, action) => {
            state.data.isAuthenticated = action.payload
        },
        setIsFetching: (state) => {
            state.status.isFetching = true;
        },
    }
});

export const {
    setUserData,
    setIsAuthenticated,
    setIsFetching
} = userSlice.actions;