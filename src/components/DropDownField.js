import { react, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownField = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Option1', value: 'Option1' },
        { label: 'Option2', value: 'Option2' }
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>DropDown Field</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholder="Select an option from list"
            />
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    dropdown: {
        width: width * 0.8,
        height: 40,
    },
    dropdownContainer: {
        width: width * 0.8,
    },
});

export default DropDownField;