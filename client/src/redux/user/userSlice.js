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
    },
});

export const { signin, signinSuccess, signinFailure } = userSlice.actions;
export default userSlice.reducer;