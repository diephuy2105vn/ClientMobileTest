import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableHighlight,
} from "react-native";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-native-fontawesome";
import Swiper from "react-native-swiper";
import { useEffect, useState } from "react";
import {
    faComputer,
    faKeyboard,
    faLaptop,
    faMouse,
} from "@fortawesome/free-solid-svg-icons";
import instance from "../../axios";
import banner1 from "../../../assets/Banner/hinh1.jpg";
import banner2 from "../../../assets/Banner/hinh2.jpg";
import banner3 from "../../../assets/Banner/hinh3.jpg";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
const Item = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image
            style={styles.itemImage}
            source={{ uri: `${item.urlImages[0]}` }}
            alt="Đây là ảnh"
        />
        <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
        </Text>
        <Text style={styles.itemPrice} numberOfLines={1}>
            {item.price.toLocaleString("de-DE")} đ
        </Text>
    </View>
);

const types = [
    {
        title: "Screen",
        icon: faComputer,
        value: "Màn hình",
    },
    {
        title: "Keyboard",
        icon: faKeyboard,
        value: "Bàn phím",
    },
    {
        title: "Mouse",
        icon: faMouse,
        value: "Chuột",
    },
    {
        title: "CPU",
        icon: faComputer,
        value: "CPU",
    },
    {
        title: "Laptop",
        icon: faLaptop,
        value: "Laptop",
    },
];

function HomeScreen({ navigation }) {
    const [productTrends, setProductTrends] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [typeActive, setTypeActive] = useState("");
    useEffect(() => {
        instance
            .get(`/api/product?page=${currentPage}&types=${typeActive}&size=6`)
            .then((res) => {
                if (currentPage === 1) {
                    setProductTrends(res.data.data);
                    return setTotalPage(res.data.totalPage);
                }
                setProductTrends((pre) => [...pre, ...res.data.data]);
            });
    }, [currentPage, typeActive]);

    return (
        <ScrollView
            style={styles.container}
            onMomentumScrollEnd={() => {
                if (currentPage < totalPage) {
                    return setCurrentPage((pre) => ++pre);
                }
                return;
            }}>
            <Swiper
                style={styles.banner}
                navigateStyle={{}}
                activeDotStyle={{
                    backgroundColor: "#bf1459",
                }}>
                <View style={styles.slide}>
                    <Image
                        style={styles.slideImage}
                        source={banner1}
                        alt="Đây là ảnh"
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.slideImage}
                        source={banner2}
                        alt="Đây là ảnh"
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.slideImage}
                        source={banner3}
                        alt="Đây là ảnh"
                    />
                </View>
            </Swiper>
            <ScrollView horizontal contentContainerStyle={styles.typeList}>
                {types.map((type, index) => (
                    <TouchableHighlight
                        key={index}
                        onPress={() => {
                            if (typeActive === type.value) {
                                setTypeActive("");
                                return setCurrentPage(1);
                            }
                            setTypeActive(type.value);
                            return setCurrentPage(1);
                        }}
                        underlayColor="none">
                        <View
                            style={{
                                ...styles.typeButton,
                                backgroundColor:
                                    typeActive === type.value
                                        ? "#bf1459"
                                        : "#fff",
                            }}>
                            <Icon
                                icon={type.icon}
                                color={
                                    typeActive === type.value
                                        ? "#fff"
                                        : "#bf1459"
                                }
                            />
                            <Text
                                style={{
                                    ...styles.typeText,
                                    color:
                                        typeActive === type.value
                                            ? "#fff"
                                            : "#bf1459",
                                }}>
                                {type.title}
                            </Text>
                        </View>
                    </TouchableHighlight>
                ))}
            </ScrollView>
            <Text style={styles.title}>Sản Phẩm</Text>
            <SafeAreaView style={styles.list}>
                {productTrends.map((item, index) => (
                    <TouchableHighlight
                        style={styles.itemWrapper}
                        onPress={() =>
                            navigation.navigate("ProductOne", {
                                product: item,
                            })
                        }
                        underlayColor="none">
                        <Item key={index} item={item} />
                    </TouchableHighlight>
                ))}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
    },
    banner: {
        objectFit: "cover",
        height: 200,
    },
    slide: {
        flex: 1,
    },
    slideImage: {
        height: "100%",
        width: "100%",
        objectFit: "contain",
    },
    typeList: {
        padding: 8,
        gap: 8,
    },
    typeButton: {
        backgroundColor: "transparent",
        borderColor: "#bf1459",
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 50,
    },

    typeText: {
        marginTop: 4,
        color: "#bf1459",
        fontSize: 10,
        fontWeight: "600",
    },

    title: {
        color: "#bf1459",
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 4,
        marginHorizontal: 8,
    },
    list: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    itemWrapper: {
        padding: 4,
        width: "50%",
    },
    itemContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        width: "100%",
        height: 188,
        borderRadius: 5,
        padding: 10,
    },

    itemImage: {
        width: "100%",
        height: 100,
        objectFit: "contain",
    },
    itemInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemName: {
        flex: 1,
        fontSize: 14,
    },
    itemPrice: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#bf1459",
        color: "#fff",
        paddingVertical: 2,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 12,
    },
    buttonShowMore: {
        marginTop: 8,
        color: "#fff",
        backgroundColor: "#bf1459",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
});

export default HomeScreen;
