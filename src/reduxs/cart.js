import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "cart",
    initialState: {
        cart: {},
        loading: false,
        error: null,
    },

    reducers: {
        cartRequested: (state, action) => {
            state.loading = true;
        },

        cartReceived: (state, action) => {
            state.cart = action.payload.data;
            state.loading = false;
        },

        cartRequestFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default slice.reducer;

const { cartRequested, cartReceived, cartRequestFailed } = slice.actions;

export const getCart = (id) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "GET",
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};

export const addDetail = (id, data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "POST",
            data: data,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};

export const deleteDetail = (id, data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "DELETE",
            data: data,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};

export const changeQuantity = (id, data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `/${id}`,
            method: "PUT",
            data: data,
            onStart: cartRequested.type,
            onSuccess: cartReceived.type,
            onError: cartRequestFailed.type,
        })
    );
};
