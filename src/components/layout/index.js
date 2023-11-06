import { View, Text, StyleSheet } from "react-native";

const Layout = ({ children }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text>Đây là header</Text>
        </View>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "100%",
    },
    header: {
        position: "fixed",
    },
});

export default Layout;
