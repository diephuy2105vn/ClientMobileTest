import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Logo from "../../../assets/Logo.png";
import instance from "../../axios";

function RegisterScreen({ navigation }) {
    const { user, setUser, loginWithAccount, logout } = useContext(AuthContext);
    const [account, setAccount] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        role: "1",
    });
    const handleSubmitForm = () => {
        instance
            .post("/auth/register", account)
            .then((res) => {
                if (res.data.status === "Success") {
                    navigation.navigate("Login");
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                        placeholder="Tài khoản"
                        value={account.username}
                        onChangeText={(text) =>
                            setAccount((pre) => ({
                                ...pre,
                                username: text,
                            }))
                        }
                        style={styles.formInput}
                    />
                    <TextInput
                        placeholder="Mật khẩu"
                        value={account.password}
                        onChangeText={(text) =>
                            setAccount((pre) => ({
                                ...pre,
                                password: text,
                            }))
                        }
                        style={styles.formInput}
                    />
                    <TextInput
                        placeholder="Xác nhận mật khẩu"
                        value={account.passwordConfirm}
                        onChangeText={(text) =>
                            setAccount((pre) => ({
                                ...pre,
                                passwordConfirm: text,
                            }))
                        }
                        style={{ ...styles.formInput, marginBottom: 30 }}
                    />
                    <TouchableHighlight
                        style={styles.formButton}
                        onPress={handleSubmitForm}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                                fontWeight: "500",
                                color: "white",
                            }}>
                            Đăng ký
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
                        onPress={() => navigation.navigate("Login")}
                        underlayColor="none">
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                fontWeight: "700",
                                color: "#bf1459",
                            }}>
                            Đăng nhập
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
        borderRadius: 20,
    },
});
export default RegisterScreen;
