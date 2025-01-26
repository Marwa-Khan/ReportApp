import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import {React, useEffect, useState} from 'react'
import SingleLineTextInput from '../../components/SingleLineTextInput';
import MultiLineTextInput from '../../components/MultiLineTextInput';
import DropDownField from '../../components/DropDownField';
import CheckBoxField from '../../components/CheckBoxField';
import DateField from '../../components/DateField';
import { ApiEndPoint, baseURL } from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormScreen =() => {
    const [loading, setLoading] = useState(false);
    const [dateVal, setDateVal]= useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    const [APIData, setAPIData]=useState({};)
    useEffect(() => {
        const initialize = async () => {
            try {
                console.log('hei from useEffect');
                const token = await AsyncStorage.getItem('userToken');
                console.log('Retrieved token:', token);
                
                // Call fetchForm() after getting the token
                fetchForm(token);
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };
    
        initialize(); // Call the async function
    }, []);
    

    const fetchForm = async(token) => {  
        console.log('Fetching token inside fetchform:', token); // Log the fetch operation
        // setLoading(true);

        try {
            const FormApiEndpoint = `${baseURL}${ApiEndPoint.GetFormApi}/34`;
            const response = await fetch(FormApiEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization':   `Bearer ${token}`, 
                },
                
            });

            console.log('Data fetched successfully on form screen!');
            // console.log('data getting from api:', response.json());

            // const statusCode = response.status;
            // console.log('Response Status Code:', statusCode); // Log the response status code

            const rawResponse = await response.json(); // Get the response as text
            console.log('Raw Response:', rawResponse); // Log the raw response

            // Check if response status is in the 2xx range (successful)
            // if (statusCode >= 200 && statusCode < 300) {
                // try {
                //     const data = JSON.parse(rawResponse); //  parsing the string response as object
                //     console.log('Parsed Response:', data);

                //     if (data.success) {
                //         // console.log('Data:', data);
                //         // await AsyncStorage.setItem('userToken', data.token);
                //         // await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                //         // Alert.alert('Success', `Welcome, ${data.user.name}!`);
                //         // navigation.navigate("Home");
                //     } else {
                //         Alert.alert('Error', 'Login failed. Please check your credentials.');
                //     }
                // } catch (parseError) {
                //     console.error('Error parsing JSON:', parseError);
                //     Alert.alert('Error', 'Failed to parse the server response.');
                // }
            // } else {
            //     // Handle non-2xx responses, like 404 or 500 errors
            //     Alert.alert('Error', `Server error: ${statusCode}`);
            //     console.error('Error response:', rawResponse);
            // }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
     }                          

 

  return (
    <View style={styles.container}>
      <Text style={styles.label}> FormScreen</Text>
      <SingleLineTextInput/>
      <MultiLineTextInput/>
      <DropDownField/>
      <CheckBoxField/>
      <Text style={{ marginBottom: 10 }}>Selected Date: {formattedDate || 'No date selected'}</Text>
      <DateField dateVal={dateVal} setDateVal={setDateVal} setFormattedDate={setFormattedDate}/>
      {/* <CheckBoxField/> */}
    </View>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.05,

    },
    label: {
        fontSize: width * 0.04,
        // marginBottom: height * 0.01,
    },
    input: {
        height: height * 0.06,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: height * 0.02,
        paddingHorizontal: width * 0.02,
    },
});

export default FormScreen