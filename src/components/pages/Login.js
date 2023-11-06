import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import Logo from "../../../assets/Logo.png";
import { useDispatch } from "react-redux";
import { getCart } from "../../reduxs/cart";
function LoginScreen({ navigation }) {
    const [account, setAccount] = useState({ username: "", password: "" });
    const { user, setUser, loginWithAccount, logout } = useContext(AuthContext);
    const dispatch = useDispatch();
    const handleLoginWithAccount = () => {
        loginWithAccount(account)
            .then((res) => {
                setUser(res.data.user);
                dispatch(getCart(res.data.user._id));
            })
            .catch((err) => {});
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Image style={styles.logo} source={Logo} />
                <View style={styles.form}>
                    <TextInput
                        value={account.username}
                        placeholder="Tài khoản"
                        style={styles.formInput}
                        onChangeText={(text) =>
                            setAccount((pre) => ({
                                ...pre,
                                username: text,
                            }))
                        }
                    />
                    <TextInput
                        value={account.password}
                        onChangeText={(text) =>
                            setAccount((pre) => ({
                                ...pre,
                                password: text,
                            }))
                        }
                        secureTextEntry={true}
                        placeholder="Mật khẩu"
                        style={{ ...styles.formInput, marginBottom: 40 }}
                    />
                    <TouchableHighlight
                        style={styles.formButton}
                        onPress={handleLoginWithAccount}
                        underlayColor="none">
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                                fontWeight: "500",
                                color: "white",
                            }}>
                            Đăng nhập
                        </Text>
                    </TouchableHighlight>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            fontWeight: "500",
                        }}>
                        Bạn chưa có tài khoản
                    </Text>
                    <TouchableHighlight
                        style={{
                            padding: 4,
                            marginLeft: 4,
                        }}
                        onPress={() => navigation.navigate("Register")}
                        underlayColor="none">
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "700",
                                color: "#bf1459",
                            }}>
                            Đăng ký
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 20,
        width: "100%",
        display: "flex",
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },

    formInput: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 10,
        marginTop: 20,
    },

    formButton: {
        display: "flex",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "#bf1459",
        borderRadius: 100,
    },
});
export default LoginScreen;
