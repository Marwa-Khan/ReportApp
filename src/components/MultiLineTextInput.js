import {React, useState} from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MultiLineTextInput = ({multiText, setMultiText}) => {
   
    return (
        
            <View style={styles.container}>
                <Text style={styles.label}>Multi Line Text Input</Text>
                <View style={styles.viewInput}>
                <TextInput style={styles.input}
                    multiline
                    numberOfLines={3}
                    
                    placeholder="Enter multi line text"
                    value={multiText}
                    onChangeText={(text)=>setMultiText(text)}
                />
                </View>
            </View>
      
    );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        height: 220, // Adjusted height to fit the input field with padding
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // Changed to white for a clean look
        borderRadius: 10, // Rounded corners
        padding: 15, // Added padding for spacing inside the container
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5, // Android shadow effect
    },
    label: {
        fontSize: width * 0.04, // Dynamic font size
        color: '#333', // Dark color for better readability
        marginBottom: height * 0.01,
        fontWeight: '600', // Bold label
        marginRight: width * 0.3, // Added margin for better alignment
    },
    viewInput: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 140, // Adjust height for input
    },
    input: {
        width: '100%',
        height: 140, // Input area size
        fontSize: 16, // Increased font size for better readability
        borderColor: '#ccc', // Soft border color
        borderWidth: 1,
        borderRadius: 8, // Rounded corners for the input field
        color: '#333', // Dark text color for the input
        paddingHorizontal: width * 0.04, // Padding inside the input
        textAlignVertical: 'top', // Align text at the top of the input area
        backgroundColor: '#f9f9f9', // Light background color for the input field
    },
});

export default MultiLineTextInput;