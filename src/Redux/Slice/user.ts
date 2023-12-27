import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    status: {
        isFetching: false,
    },
    data: {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        isLoggedIn: false,
    },
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.data.id = action.payload.id
            state.data.first_name = action.payload.first_name
            state.data.last_name = action.payload.last_name
            state.data.email = action.payload.email
        },
        setIsLoggedIn: (state, action) => {
            state.data.isLoggedIn = action.payload
        },
        setIsFetching: (state) => {
            state.status.isFetching = true;
        },
    }
});

export const {
    setUserData,
    setIsLoggedIn,
    setIsFetching
} = userSlice.actions;