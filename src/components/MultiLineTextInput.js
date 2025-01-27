import {React, useState} from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MultiLineTextInput = ({multiText, setMultiText}) => {
   
    return (
        
            <View style={styles.container}>
                <Text style={styles.label}>MultiLine Text Input</Text>
                <View style={styles.viewInput}>
                <TextInput style={styles.input}
                    multiline
                    numberOfLines={3}
                    
                    placeholder="Enter multiline text"
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
            marginVertical:15,
            height: 200,
            width: '90%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            // padding: width * 0.05,
            backgroundColor:'yellow'
        },
        label: {
            
            fontSize: width * 0.04,
            // marginBottom: height * 0.01,
        },
        viewInput:{
            
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: 140,
            
        },
        input: {
            width:'100%',
            height: 140,
            fontSize:13,
            borderColor: 'gray',
            borderWidth: 1,
            color:'black',
            // justifyContent: 'center',
            // alignItems: 'center',
            paddingHorizontal: width * 0.02,
            textAlignVertical:'top',
            backgroundColor:'red'
        },
    
    });
export default MultiLineTextInput;