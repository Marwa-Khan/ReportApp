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
        height: 220, 
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', 
        borderRadius: 10, 
        padding: 15, 
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5, // Android shadow effect
    },
    label: {
        fontSize: width * 0.04, 
        color: '#333', 
        marginBottom: height * 0.01,
        fontWeight: '600', 
        marginRight: width * 0.3, 
    },
    viewInput: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 140, 
    },
    input: {
        width: '100%',
        height: 140, 
        fontSize: 16, 
        borderColor: '#ccc', 
        borderWidth: 1,
        borderRadius: 8, 
        color: '#333', 
        paddingHorizontal: width * 0.04, 
        textAlignVertical: 'top', 
        backgroundColor: '#f9f9f9', 
    },
});

export default MultiLineTextInput;