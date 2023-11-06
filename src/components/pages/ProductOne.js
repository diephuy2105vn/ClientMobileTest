import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { addDetail } from "../../reduxs/cart";
function ProductOneScreen({ route }) {
    const { product } = route.params;
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    return (
        <ScrollView
            style={{
                height: "100%",
                width: "100%",
            }}>
            <Swiper
                style={styles.productThumbnail}
                navigateStyle={{}}
                activeDotStyle={{
                    backgroundColor: "#bf1459",
                }}>
                {product.urlImages.map((image, index) => (
                    <View style={styles.slide} key={index}>
                        <Image
                            style={styles.slideImage}
                            source={{ uri: image }}
                            alt="Đây là ảnh"
                        />
                    </View>
                ))}
            </Swiper>
            <View style={{ paddingHorizontal: 4, marginTop: 10 }}>
                <Text style={styles.productName}>{product.name}</Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 15,
                    }}>
                    <Text style={styles.productPrice}>
                        {product.price.toLocaleString("de-DE")} đ
                    </Text>
                    <Text style={styles.productQuantity}>
                        {product.quantity} sản phẩm
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 16,
                        marginTop: 8,
                        marginBottom: 32,
                    }}>
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            borderRadius: 5,
                            overflow: "hidden",
                            backgroundColor: "#bf1459",
                            padding: 8,
                        }}
                        onPress={() => {}}
                        activeOpacity={0.8}
                        underlayColor="none">
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#fff",
                            }}>
                            Mua hàng
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            flex: 1,
                            borderRadius: 5,
                            overflow: "hidden",
                            backgroundColor: "#fff",
                            borderWidth: 2,
                            borderColor: "#bf1459",
                            padding: 8,
                        }}
                        onPress={() => {
                            console.log("Them vao gio");
                            return dispatch(
                                addDetail(user._id, {
                                    product: product,
                                    quantity: 1,
                                })
                            );
                        }}
                        activeOpacity={0.8}
                        underlayColor="none">
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#bf1459",
                            }}>
                            Thêm vào giỏ
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.productDescription}>
                    <Text>{product.description}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productThumbnail: {
        backgroundColor: "#fff",
        objectFit: "cover",
        display: "flex",
        height: 240,
    },
    slide: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    slideImage: {
        height: 200,
        width: "100%",
        objectFit: "contain",
    },

    productName: {
        paddingHorizontal: 4,
        fontSize: 16,
        fontWeight: "600",
    },

    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "#bf1459",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 12,
        overflow: "hidden",
    },
    productQuantity: {
        fontSize: 14,
        color: "#333",
    },
    productDescription: {
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
});
export default ProductOneScreen;
