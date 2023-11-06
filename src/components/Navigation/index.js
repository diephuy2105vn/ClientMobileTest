import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faGear,
    faUser,
    faHouse,
    faCartShopping,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/authContext";
import { useContext, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
} from "react-native";
import HomeScreen from "../pages/Home";
import ProductOneScreen from "../pages/ProductOne";
import CartScreen from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useDispatch } from "react-redux";
import { getCart } from "../../reduxs/cart";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerSearch}>
                <TextInput style={styles.headerInput} />
                <TouchableHighlight
                    style={styles.headerIcon}
                    activeOpacity={0.6}
                    underlayColor="none">
                    <FontAwesomeIcon icon={faSearch} size={20} />
                </TouchableHighlight>
            </View>
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductOne" component={ProductOneScreen} />
        </Stack.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};
const PrivateStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let icon;

                    if (route.name === "Home") {
                        icon = faHouse;
                    }
                    if (route.name === "Cart") {
                        icon = faCartShopping;
                    }
                    if (route.name === "User") {
                        icon = faUser;
                    }
                    if (route.name === "Setting") {
                        icon = faGear;
                    }
                    return (
                        <FontAwesomeIcon
                            icon={icon}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarStyle: {
                    backgroundColor: "#ddd",
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#bf1459",
                tabBarInactiveTintColor: "black",
                header: (props) => <CustomHeader />,
            })}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="User" component={HomeScreen} />
            <Tab.Screen name="Setting" component={HomeStack} />
        </Tab.Navigator>
    );
};
const Navigation = () => {
    const dispatch = useDispatch();
    const { user, setUser, refresh } = useContext(AuthContext);
    useEffect(() => {
        refresh()
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {});
    }, []);

    return (
        <NavigationContainer>
            {user ? <PrivateStack /> : <AuthStack />}
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#ddd",
        paddingTop: 54,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        height: 100,
    },
    headerSearch: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 5,
        overflow: "hidden",
    },
    headerInput: {
        paddingHorizontal: 16,
        height: "100%",
        flex: 1,
        fontSize: 16,
    },
    headerIcon: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
});

export default Navigation;
