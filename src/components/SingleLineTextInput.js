import {React, useState} from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleLineTextInput = () => {

   const [text, onChangeText] = useState('Useless Text');
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.label}>Text Input</Text>
                <TextInput
                    style={styles.input}
                    placeholder="enter text"
                    value={text}
                    onChangeText={onChangeText}
                    // secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
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

export default SingleLineTextInput;