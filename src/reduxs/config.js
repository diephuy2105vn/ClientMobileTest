import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cart";
import api from "./middleware";

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export default store;
