import axios from "axios";
import * as actions from "./api";
import instance from "../axios";
const middleware =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== actions.apiCallBegan.type) return next(action);
        const { url, method, data, onStart, onSuccess, onError } =
            action.payload;
        if (onStart) dispatch({ type: onStart });
        next(action);

        try {
            if (!method || method === "GET") {
                const res = await instance.get(`cart/${url}`);
                dispatch(actions.apiCallSucess(res.data));

                if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
                return;
            }
            const res = await axios.request({
                baseURL: "http://10.13.130.154:8080/cart",
                url,
                method,
                data: { data: data },
                withCredentials: true,
            });

            dispatch(actions.apiCallSucess(res.data));
            if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
        } catch (error) {
            dispatch(actions.apiCallFailed(error.message));
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default middleware;
