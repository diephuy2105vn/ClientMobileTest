import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableHighlight,
} from "react-native";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "expo-checkbox";
import { getCart, deleteDetail, changeQuantity } from "../../reduxs/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import InputNumber from "../InputNumber";
import AuthContext from "../../context/authContext";

function CartScreen({ navigation }) {
    const dispatch = useDispatch();
    const [isCheckedDetail, setIsCheckedDetail] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        dispatch(getCart(user._id));
    }, []);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        setTotalPrice(0);
        cart?.details?.map((detail) => {
            if (isCheckedDetail.includes(detail.id)) {
                setTotalPrice(
                    (pre) => (pre += detail.quantity * detail.product.price)
                );
            }
        });
    }, [cart, isCheckedDetail]);

    return (
        <View>
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        fontSize: 20,
                        padding: 8,
                        textAlign: "center",
                    }}>
                    Giỏ hàng (
                    <Text
                        style={{
                            fontSize: 16,
                            padding: 8,
                            textAlign: "center",
                        }}>
                        {cart?.details?.length}
                    </Text>
                    )
                </Text>
                {cart?.details?.map((detail, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                ...styles.itemBox,
                                borderTopWidth: 1,
                                borderTopColor: "#ccc",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Checkbox
                                value={isCheckedDetail.includes(detail.id)}
                                onValueChange={() => {
                                    if (isCheckedDetail.includes(detail.id)) {
                                        setIsCheckedDetail((pre) =>
                                            pre.filter((id) => id !== detail.id)
                                        );
                                        setTotalPrice(
                                            (pre) =>
                                                (pre -=
                                                    detail.quantity *
                                                    detail.product.price)
                                        );
                                        return;
                                    }

                                    setIsCheckedDetail((pre) => [
                                        ...pre,
                                        detail.id,
                                    ]);
                                    setTotalPrice(
                                        (pre) =>
                                            (pre +=
                                                detail.quantity *
                                                detail.product.price)
                                    );
                                }}
                                style={{ width: 16, height: 16 }}
                            />
                            <View style={styles.itemThumbnail}>
                                <Image
                                    style={{ width: "100%", height: "100%" }}
                                    source={{
                                        uri: `${detail.product.urlImages[0]}`,
                                    }}
                                />
                            </View>
                            <View style={styles.itemInfo}>
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
                                    <Text style={{}}>
                                        {detail.product.price}
                                    </Text>
                                    <InputNumber
                                        value={detail.quantity}
                                        onChangeText={(text) => {
                                            const data = {
                                                ...detail,
                                                quantity: Number(text),
                                            };
                                            dispatch(
                                                changeQuantity(user._id, data)
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                            <TouchableHighlight
                                style={{ marginLeft: 10 }}
                                onPress={() => {
                                    setIsCheckedDetail((pre) => [
                                        ...pre,
                                        detail.id,
                                    ]);
                                    return dispatch(
                                        deleteDetail(user._id, detail)
                                    );
                                }}>
                                <Icon
                                    style={{
                                        width: 16,
                                        height: 16,
                                        padding: 4,
                                    }}
                                    icon={faX}
                                />
                            </TouchableHighlight>
                        </View>
                    );
                })}
            </ScrollView>
            <View style={styles.cartBottom}>
                <View
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: 500,
                        }}>
                        Tổng {totalPrice.toLocaleString("de-DE")} đ
                    </Text>
                </View>
                <TouchableHighlight
                    style={{
                        flex: 1,
                        backgroundColor: "#bf1459",
                        padding: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {}}
                    activeOpacity={0.8}
                    underlayColor="none">
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: 500,
                        }}
                        onPress={() => {
                            const order = cart.details.filter((detail) =>
                                isCheckedDetail.includes(detail.id)
                            );
                            navigation.navigate("Order", {
                                orderDetails: order,
                            });
                        }}>
                        Mua hàng
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemBox: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    itemThumbnail: {
        height: 80,
        width: 80,
        padding: 8,
        objectFit: "contain",
        marginHorizontal: 10,
    },
    itemInfo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
    container: {
        width: "100%",
        display: "flex",
        marginBottom: 50,
    },
    cartBottom: {
        width: "100%",
        height: 50,
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        bottom: 0,
    },
});
export default CartScreen;
