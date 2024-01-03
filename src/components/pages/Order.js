import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TextInput,
} from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import instance from "../../axios";
import { getCart } from "../../reduxs/cart";
function OrderScreen({ route, navigation }) {
    const { orderDetails } = route.params;

    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        name: "",
        address: "",
        phone: "",
        payment: "",
        details: [],
        totalPrice: 0,
    });
    useEffect(() => {
        setOrder((pre) => ({
            details: orderDetails,
            totalPrice: orderDetails.reduce(
                (total, detail) =>
                    total + detail.product.price * detail.quantity,
                0
            ),
        }));
    }, [orderDetails]);
    const handleSubmitForm = () => {
        instance.post("/order", { data: order }).then((res) => {
            dispatch(getCart(user._id));
            navigation.navigate("Home");
        });
    };
    return (
        <View>
            <Text
                style={{
                    fontSize: 24,
                    padding: 10,
                    textAlign: "center",
                    fontWeight: "bold",
                }}>
                Đặt hàng
            </Text>
            <ScrollView
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                }}>
                {order.details?.map((detail, index) => {
                    return (
                        <View
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingHorizontal: 12,
                                paddingVertical: 5,
                                gap: 10,
                                borderTopWidth: 1,
                                borderTopColor: "#ccc",
                            }}>
                            <View style={{ width: 60, height: 60 }}>
                                <Image
                                    style={{ width: "100%", height: "100%" }}
                                    source={{
                                        uri: `${detail.product.urlImages[0]}`,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flex: 1,
                                    justifyContent: "center",
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        marginBottom: 4,
                                    }}>
                                    {detail.product.name}
                                </Text>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <Text style={{ fontSize: 13 }}>
                                        {detail.product.price.toLocaleString(
                                            "de-DE"
                                        )}{" "}
                                        đ
                                    </Text>
                                    <Text style={{ fontSize: 13 }}>
                                        Số lượng: {detail.quantity}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
                <Text
                    style={{
                        marginVertical: 16,
                        fontSize: 14,
                        fontWeight: "500",
                    }}>
                    Tổng tiền: {order.totalPrice.toLocaleString("de-DE")} đ
                </Text>
                <View>
                    <View
                        style={{
                            width: "100%",
                            paddingHorizontal: 4,
                            paddingVertical: 40,
                            gap: 10,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: "#ccc",
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}>
                            Thông tin khách hàng
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={order.name}
                            onChangeText={(text) =>
                                setOrder((pre) => ({
                                    ...pre,
                                    name: text,
                                }))
                            }
                            placeholder="Tên khách hàng"
                        />
                        <TextInput
                            style={styles.input}
                            value={order.phone}
                            onChangeText={(text) =>
                                setOrder((pre) => ({
                                    ...pre,
                                    phone: text,
                                }))
                            }
                            placeholder="Số điện thoại"
                        />
                        <TextInput
                            style={styles.input}
                            value={order.address}
                            onChangeText={(text) =>
                                setOrder((pre) => ({
                                    ...pre,
                                    address: text,
                                }))
                            }
                            placeholder="Địa chỉ"
                        />

                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    marginVertical: 16,
                                }}>
                                Phương thức thanh toán
                            </Text>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <Checkbox
                                    value={
                                        order.payment == "payment-on-delivery"
                                    }
                                    onValueChange={() =>
                                        order.payment !== "payment-on-delivery"
                                            ? setOrder((pre) => ({
                                                  ...pre,
                                                  payment:
                                                      "payment-on-delivery",
                                              }))
                                            : setOrder((pre) => ({
                                                  ...pre,
                                                  payment: "",
                                              }))
                                    }
                                    style={{ width: 16, height: 16 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "600",
                                        marginLeft: 20,
                                    }}>
                                    Thanh toán khi nhận hàng
                                </Text>
                            </View>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: 10,
                                }}>
                                <Checkbox
                                    value={order.payment == "payment-VNPAY"}
                                    onValueChange={() =>
                                        order.payment !== "payment-VNPAY"
                                            ? setOrder((pre) => ({
                                                  ...pre,
                                                  payment: "payment-VNPAY",
                                              }))
                                            : setOrder((pre) => ({
                                                  ...pre,
                                                  payment: "",
                                              }))
                                    }
                                    style={{ width: 16, height: 16 }}
                                />
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "600",
                                        marginLeft: 20,
                                    }}>
                                    Thanh toán băng VNPAY
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                marginTop: 20,
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                            }}>
                            <TouchableHighlight
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    backgroundColor: "#bf1459",
                                }}
                                onPress={handleSubmitForm}
                                underlayColor="none">
                                <Text
                                    style={{
                                        fontSize: 16,
                                        textAlign: "center",
                                        fontWeight: "500",
                                        color: "white",
                                    }}>
                                    Đặt hàng
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    backgroundColor: "#fff",
                                    borderColor: "#000",
                                    borderWidth: 2,
                                }}
                                onPress={() => navigation.navigate("Home")}
                                underlayColor="none">
                                <Text
                                    style={{
                                        fontSize: 16,
                                        textAlign: "center",
                                        fontWeight: "500",
                                    }}>
                                    Hủy
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
        fontSize: 14,
    },
});
export default OrderScreen;
