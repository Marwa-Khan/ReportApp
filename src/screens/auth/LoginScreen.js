import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndPoint, baseURL } from '../../hooks';
import Navigation from '../../navigation/Navigation';
import {
    useNavigation,
  } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [uuid, setUuid] = useState('Te8q9');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        
        const loginApiEndpoint = `${baseURL}${ApiEndPoint.loginApi}`;
        console.log('Login API Endpoint:', loginApiEndpoint);
        console.log('User Name:', userName);
        console.log('User ID:', uuid);
        console.log('Password:', password);

        setLoading(true);

        try {
            const response = await fetch(loginApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "uuid": uuid, "password": password }), //convert object to string to send it to web server
            });

            const statusCode = response.status;
            console.log('Response Status Code:', statusCode); // Log the response status code

            const rawResponse = await response.text(); // Get the response as text
            console.log('Raw Response:', rawResponse); // Log the raw response

            // Check if response status is in the 2xx range (successful)
            // if (statusCode >= 200 && statusCode < 300) {
                console.log('Login successful!');
                try {
                    const data = JSON.parse(rawResponse); //  parsing the string response as object
                    console.log('Parsed Response:', data);

                    if (data.success) {
                        await AsyncStorage.setItem('userToken', data.token);
                        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
                        Alert.alert('Success', `Welcome, ${data.user.name}!`);
                        navigation.navigate("Home");
                    } else {
                        Alert.alert('Error', 'Login failed. Please check your credentials.');
                    }
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    Alert.alert('Error', 'Failed to parse the server response.');
                }
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
    };

    return (
        
                <View style={styles.container}>
                    <Text style={styles.label}>User Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter userName"
                        value={userName}
                        onChangeText={setUserName}
                        autoCapitalize="none"
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" /> // Show loading spinner while logging in
                    ) : (
                    <Button title="Login" onPress={handleLogin} disabled={loading} />
                    )}
                </View>
        
    );
};

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

export default LoginScreen;
