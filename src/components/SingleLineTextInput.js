import {React, useState} from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleLineTextInput = ({textData,setTextData}) => {
   

   const onChangeText = (val)=>{setTextData(val)};
    return (
            <View style={styles.container}>
                <Text style={styles.label}>Single Line Text Input</Text>
                <View style={styles.viewInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter text"
                    value={textData}
                    onChangeText={onChangeText}
                    multiline={false}
                    // secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                />
                </View>
            </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff', 
        alignSelf: 'center',
        height: 120,
        width: '90%', 
        borderRadius: 10, 
        padding: 15, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5, // For Android shadow effect
    },
    label: {
        fontSize: width * 0.04, 
        color: '#333', 
        marginBottom: height * 0.01,
        fontWeight: '600', 
    },
    viewInput: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%', 
        height: 50,
        fontSize: 16, 
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 8, 
        color: '#333', 
        paddingHorizontal: width * 0.04, 
        backgroundColor: '#f9f9f9', 
    },
});

export default SingleLineTextInput;