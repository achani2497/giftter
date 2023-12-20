import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     state: {
//         isFetching: false,
//     },
//     user: {
//         name: "casdasds",
//         isAuthenticated: false
//     },
// }


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            name: 'asdasd',
            isAuthenticated: false
        }
    },
    reducers: {
        setIsFetching: (state) => {
            state.state.isFetching = true;
        },
        setIsAuthenticaded: (state) => {
            return { ...state, isAuthenticated: false }
        }
    }
});

export const {
    setIsFetching,
    setIsAuthenticaded
} = userSlice.actions;


export default userSlice.reducer;