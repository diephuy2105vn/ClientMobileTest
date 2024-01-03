import {
    View,
    TextInput,
    TouchableHighlight,
    Text,
    StyleSheet,
    Platform,
} from "react-native";
import { useState, useRef } from "react";
import { useEffect } from "react";

const InputNumber = ({ value, style, onChangeText }) => {
    const [valueInput, setValueInput] = useState(`${value}`);
    useEffect(() => {
        setValueInput(`${value}`);
    }, [value]);
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                minWidth: 80,
                ...style,
            }}>
            <TouchableHighlight
                style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderRightWidth: 1,
                    borderRightColor: "#ccc",
                    ...style,
                }}
                onPress={() => {
                    if (Number(valueInput > 1)) {
                        onChangeText(Number(valueInput) - 1);
                        return setValueInput((pre) => `${Number(pre) - 1}`);
                    }
                }}>
                <Text>-</Text>
            </TouchableHighlight>
            <TextInput
                value={valueInput}
                onChangeText={(text) => {
                    if (Number(text) > 0) {
                        onChangeText(text);
                        return setValueInput(text);
                    }
                    return setValueInput("1");
                }}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                style={{
                    color: "#000",
                    padding: 4,
                    flex: 1,
                    textAlign: "center",
                    ...style,
                }}
                readOnly
            />
            <TouchableHighlight
                style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderLeftWidth: 1,
                    borderLeftColor: "#ccc",
                    ...style,
                }}
                onPress={() => {
                    onChangeText(Number(valueInput) + 1);
                    return setValueInput((pre) => `${Number(pre) + 1}`);
                }}>
                <Text>+</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({});

export default InputNumber;
