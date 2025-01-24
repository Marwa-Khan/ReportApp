import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LoginScreen from './src/screens/auth/LoginScreen';
import CTextInput from './src/components/SingleLineTextInput';
import SingleLineTextInput from './src/components/SingleLineTextInput';
import MultiLineTextInput from './src/components/MultiLineTextInput';
import DropDownField from './src/components/DropDownField';
import RadioButtonField from './src/components/RadioButtonField';
import Navigation from './src/navigation/Navigation';


export default function App() {
  return (
    // <View style={styles.container}>
      // {/* <Text>Open up App.js to start working on your app!</Text> */}
      // {/* <LoginScreen/> */}
      // {/* <SingleLineTextInput/> */}
      // {/* <MultiLineTextInput/> */}
      // {/* <DropDownField/> */}
      // {/* <RadioButtonField/> */}
      
      
      // <StatusBar style="auto" />
      
      // </View>
      <Navigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
