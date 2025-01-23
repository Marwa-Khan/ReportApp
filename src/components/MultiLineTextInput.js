import {React, useState} from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MultiLineTextInput = () => {
    const [text, onChangeText] = useState('Useless Multiline Text');
    return (
        <SafeAreaView>
            <View>
                <Text>MultiLine Text Input</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
                    value={text}
                    onChangeText={onChangeText}
                />
            </View>
        </SafeAreaView>
    );
};
 const { width, height } = Dimensions.get('window');
 const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: width * 0.05,
        },
        label: {
            fontSize: width * 0.04,
            marginBottom: height * 0.01,
        },
        input: {
            height: height * 0.06,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: height * 0.02,
            paddingHorizontal: width * 0.02,
        },
    });
export default MultiLineTextInput;