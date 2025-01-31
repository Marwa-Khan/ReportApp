import { react, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownField = ( {dropDownData, setDropDownData}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
   

    return (
        <View style={styles.container}>
            <Text style={styles.label}>DropDown Field</Text>

            <DropDownPicker style={styles.dropdown}
                open={open}
                value={value}
                items={dropDownData}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={(val)=>console.log(val)}
                setItems={setDropDownData}
                containerStyle={styles.dropdownContainer}
                placeholder="Select a day from list"
            />
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // height: '60%',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10,
        // backgroundColor: 'yellow',
        height: 105,
        padding: width * 0.03,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    label: {
        fontSize: width * 0.04, // Dynamic font size
        color: '#333', // Dark color for better readability
        marginBottom: height * 0.01,
        fontWeight: '600', // Bold label
        marginRight: width * 0.3,
    },
    dropdown: {
        width: width * 0.8,
        height: height * 0.05,
    },
    dropdownContainer: {
        width: width * 0.8,
    },
});

export default DropDownField;