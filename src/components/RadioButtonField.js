

import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { View, Text,StyleSheet, Dimensions } from 'react-native';

const RadioButtonField = () => { 
    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Option 1',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Option 2',
            value: 'option2'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState(null);   
    return (
        <View>
            <Text>Please select an option:</Text>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={setSelectedId}
                selectedId={selectedId}
            />
        </View>
    );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.04,
    },
    text: {
        fontSize: width * 0.045,
        marginBottom: height * 0.02,
    },
    radioGroup: {
        width: '100%',
    },
});

export default RadioButtonField;