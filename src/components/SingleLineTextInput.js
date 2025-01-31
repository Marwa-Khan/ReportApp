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
        backgroundColor: '#ffffff', // Changed to white for a clean look
        alignSelf: 'center',
        height: 120,
        width: '90%', // Adjust width for responsiveness
        borderRadius: 10, // Rounded corners for the container
        padding: 15, // Added padding for internal spacing
        shadowColor: "#000", // Added shadow for depth
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5, // For Android shadow effect
    },
    label: {
        fontSize: width * 0.04, // Dynamic font size
        color: '#333', // Dark text color for better readability
        marginBottom: height * 0.01,
        fontWeight: '600', // Bold for emphasis
    },
    viewInput: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%', // Use full width within the container
        height: 50,
        fontSize: 16, // Larger font size for better readability
        borderColor: '#ccc', // Soft border color
        borderWidth: 1,
        borderRadius: 8, // Rounded corners for input field
        color: '#333', // Dark text color for input
        paddingHorizontal: width * 0.04, // Padding inside the input for spacing
        backgroundColor: '#f9f9f9', // Light background color for the input field
    },
});

export default SingleLineTextInput;