import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableHighlight,
} from "react-native";
import { getCart } from "../../reduxs/cart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import InputNumber from "../InputNumber";
import AuthContext from "../../context/authContext";
function CartScreen() {
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        dispatch(getCart(user._id));
    }, []);

    return (
        <View>
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
                    {cart.details?.length}
                </Text>
                )
            </Text>
            <ScrollView style={styles.container}>
                {cart.details?.map((detail, index) => {
                    return (
                        <View
                            style={{
                                ...styles.itemBox,
                                borderTopWidth: index !== 0 && 1,
                                borderTopColor: index !== 0 && "#ccc",
                            }}>
                            <View style={styles.itemThumbnail}>
                                <Image
                                    style={{ width: "100%", height: "100%" }}
                                    source={{
                                        uri: `${detail.product.urlImages[0]}`,
                                    }}
                                />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text style={{ fontSize: 13, fontWeight: 500 }}>
                                    {detail.product.name}
                                </Text>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}>
                                    <InputNumber value={detail.quantity} />
                                </View>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    itemBox: {
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    itemThumbnail: {
        height: 80,
        width: 80,
        padding: 8,
        objectFit: "contain",
        marginRight: 10,
    },
    itemInfo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
    container: {
        width: "100%",
    },
});
export default CartScreen;
