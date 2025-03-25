

import {createSlice} from '@reduxjs/toolkit';


const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state, action) => {
            state.loading = true;
        },
        hideLoading: (state, action) => {
            state.loading = false
        }
    }
});


export const {showLoading, hideLoading} = loaderSlice.actions;
export default loaderSlice.reducer;