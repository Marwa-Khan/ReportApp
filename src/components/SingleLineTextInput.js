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
        // marginTop:200,
        // paddingTop: 20,
        // flex: 1,
        // justifyContent: 'center',
        // // padding: width * 0.05,
        // // alignItems: 'center',
        // width: '90%',
        backgroundColor:'orange', 
        alignSelf: 'center',
        height: 120,

        
    },
    label: {
        fontSize: width * 0.04,
        marginBottom: height * 0.01,
    },
    viewInput:{
        // width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    input: {
        width:'90%',
        height: 50,
        fontSize:13,
        borderColor: 'gray',
        borderWidth: 1,
        color:'black',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: height * 0.02,
        paddingHorizontal: width * 0.02,
        

    },
    
});

export default SingleLineTextInput;