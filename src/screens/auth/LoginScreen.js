import React, { useState } from 'react';
import {
    View, Text, TextInput, Button, StyleSheet,
    Alert, ActivityIndicator, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndPoint, baseURL } from '../../hooks';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const [uuid, setUuid] = useState('Te8q9');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // AsyncStorage.getItem('userToken');
        const loginApiEndpoint = `${baseURL}${ApiEndPoint.loginApi}`;
        console.log('Login API Endpoint:', loginApiEndpoint);

        setLoading(true);

        try {
            const response = await fetch(loginApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "uuid": uuid, "password": password }),
            });

            const statusCode = response.status;
            const rawResponse = await response.text();

            console.log('Response Status Code:', statusCode);
            console.log('Raw Response:', rawResponse);

            try {
                const data = JSON.parse(rawResponse);
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
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={userName}
                    onChangeText={setUserName}
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
                ) : (
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                )}

                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        // flex: 1,
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        alignSelf: 'center', 
        marginTop: 30,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#F8F9FA',
    },
    loginButton: {
        width: '100%',
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
   
    loader: {
        marginVertical: 20,
    },
});

export default LoginScreen;
