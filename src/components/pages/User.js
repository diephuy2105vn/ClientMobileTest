import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
    TextInput,
} from "react-native";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-native-fontawesome";
import Swiper from "react-native-swiper";
import { useEffect, useState } from "react";

import instance from "../../axios";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

function UserScreen({ navigation }) {
    const { user, setUser, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const [orders, setOrders] = useState([]);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [view, setView] = useState("Info");
    useEffect(() => {
        if (user && view === "Info")
            instance.get(`/api/profile/${user._id}`).then((res) => {
                setProfile((pre) => ({
                    name: res.data.data.name,
                    address: res.data.data.address,
                    phone: res.data.data.phone,
                }));
            });
        if (user && view === "Order") {
            instance.get(`/api/profile/order/${user._id}`).then((res) => {
                setOrders(res.data.data);
            });
        }
    }, [user, view]);

    return (
        <>
            <View>
                <View style={styles.userHeader}>
                    <View style={styles.userAvatar}>
                        <Image
                            style={{ height: "100%", width: "100%" }}
                            source={{ uri: user.urlAvatar }}
                        />
                    </View>
                    <Text
                        style={{
                            marginTop: 16,
                            fontSize: 20,
                            fontWeight: 700,
                        }}>
                        {user.username}
                    </Text>
                </View>
                <View style={styles.userNav}>
                    <TouchableHighlight
                        style={{
                            ...styles.userLink,
                            backgroundColor:
                                view == "Info" ? "#bf1459" : "#fff",
                        }}
                        onPress={() => setView("Info")}
                        activeOpacity={0.8}
                        underlayColor="none">
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "700",
                                color: view == "Info" ? "#fff" : "#bf1459",
                            }}>
                            Thông tin
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            ...styles.userLink,
                            backgroundColor:
                                view == "Order" ? "#bf1459" : "#fff",
                        }}
                        onPress={() => setView("Order")}
                        activeOpacity={0.8}
                        underlayColor="none">
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "700",
                                color: view == "Order" ? "#fff" : "#bf1459",
                            }}>
                            Đơn hàng
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView style={styles.container}>
                <View
                    style={{
                        ...styles.userInfo,
                        display: view === "Info" ? "flex" : "none",
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                        Thông tin tài khoản
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        value={profile.name}
                        placeholder="Nhập tên khách hàng"
                        readOnly={isReadOnly}
                    />
                    <TextInput
                        style={styles.textInput}
                        value={profile.phone}
                        placeholder="Nhập tên khách hàng"
                        readOnly={isReadOnly}
                    />
                    <TextInput
                        style={styles.textInput}
                        value={profile.address}
                        placeholder="Nhập tên khách hàng"
                        readOnly={isReadOnly}
                    />
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 20,
                            gap: 10,
                        }}>
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight
                                style={{
                                    margin: 0,
                                    backgroundColor: "#bf1459",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    ...(isReadOnly === false
                                        ? { display: "flex" }
                                        : { display: "none" }),
                                }}
                                onPress={() => setIsReadOnly(true)}
                                underlayColor="none">
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 16,
                                        fontWeight: "700",
                                    }}>
                                    Lưu
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    margin: 0,
                                    backgroundColor: "#bf1459",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    ...(isReadOnly === true
                                        ? { display: "flex" }
                                        : { display: "none" }),
                                }}
                                onPress={() => setIsReadOnly(false)}
                                underlayColor="none">
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 16,
                                        fontWeight: "700",
                                    }}>
                                    Cập nhật
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight
                            style={{
                                flex: 1,

                                backgroundColor: "#fff",
                                borderWidth: 1,
                                borderColor: "#bf1459",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10,
                            }}
                            onPress={() =>
                                logout().then((res) => {
                                    setUser();
                                })
                            }
                            underlayColor="none">
                            <Text
                                style={{
                                    color: "#bf1459",
                                    fontSize: 16,
                                    fontWeight: "700",
                                }}>
                                Đăng xuất
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View
                    style={{
                        ...styles.userOrder,
                        display: view === "Order" ? "flex" : "none",
                    }}>
                    {orders.map((order, index) => (
                        <View
                            key={index}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                borderColor: "#ccc",
                                borderTopWidth: 1,
                            }}>
                            <View style={{ width: 70, height: 70 }}>
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                    source={{
                                        uri: order.details[0].product
                                            .urlImages[0],
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    marginLeft: 20,
                                }}>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                        }}>
                                        {order.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            backgroundColor: "#bf1459",
                                            paddingVertical: 4,
                                            paddingHorizontal: 6,
                                            overflow: "hidden",
                                            borderRadius: 10,
                                            color: "#fff",
                                        }}>
                                        {order.totalPrice}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        color:
                                            order.status === "Unconfirm"
                                                ? "red"
                                                : "green",
                                    }}>
                                    {order.status === "Unconfirm"
                                        ? "Chưa xác nhận"
                                        : "Xác nhận"}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    userHeader: {
        backgroundColor: "#fff",
        height: 180,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    userAvatar: {
        backgroundColor: "#",
        height: 100,
        width: 100,
        borderRadius: "50%",
    },
    userNav: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        backgroundColor: "#fff",
    },
    userLink: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    userInfo: {
        display: "flex",
        paddingVertical: 20,
        paddingHorizontal: 12,
        justifyContent: "center",
        gap: 10,
    },
    userOrder: {
        display: "flex",
        paddingVertical: 20,
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    container: {
        backgroundColor: "#fff",
        marginVertical: 20,
        paddingVertical: 10,
    },
    textInput: {
        color: "#000",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        backgroundColor: "#fff",
        fontSize: 15,
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: "100%",
    },
});

export default UserScreen;
