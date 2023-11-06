import { createContext, useState } from "react";
import instance from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginWithAccount = (account) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await instance.post("/auth/login", account);
                await AsyncStorage.setItem("accessToken", res.data.accessToken);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };

    const register = (account) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await instance.post("/auth/login", account);
                await AsyncStorage.setItem("accessToken", res.data.accessToken);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };

    const refresh = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await AsyncStorage.getItem("accessToken");
                if (token) {
                    const res = await instance.post("/auth/refresh");
                    resolve(res);
                }
                reject();
            } catch (err) {
                reject(err);
            }
        });
    };

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await instance.post("/auth/logout");
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    };
    return (
        <AuthContext.Provider
            value={{ user, setUser, loginWithAccount, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
