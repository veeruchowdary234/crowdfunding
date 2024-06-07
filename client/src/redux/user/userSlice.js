import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.loading = true;
            state.error=null;
        },
        signinSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error=null;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signout: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        signoutSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        signoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signin, signinSuccess, signinFailure, updateStart,updateSuccess,updateFailure,deleteStart,deleteSuccess,deleteFailure,signout,signoutSuccess,signoutFailure} = userSlice.actions;
export default userSlice.reducer;