import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import FormScreen from '../screens/home/FormScreen';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown:false}}>
            <Stack.Screen name="Auth" component={LoginScreen} />
            <Stack.Screen name="Home" component={FormScreen} />

        </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default Navigation