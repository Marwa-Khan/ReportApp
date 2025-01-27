import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const RadioButtonField = ({ radioData, setRadioData }) => {
    const [selectedId, setSelectedId] = useState(null);

    // Set the selectedId when radioData changes
    useEffect(() => {
        const selectedOption = radioData.find(item => item.selected);
        if (selectedOption) {
            setSelectedId(selectedOption.id);
        }
    }, [radioData]);

    // Handle radio button selection
    const handleSelect = (selected) => {
        // console.log('Selected:', selected);
        const updatedData = radioData.map((item) =>
            item.id === selected ? { ...item, selected: true } : { ...item, selected: false }
        );
        setRadioData(updatedData); // Pass updated data back to parent
        setSelectedId(selected.id); // Update the local selected state
        
    };

    return (
        <View style={{flex:1, backgroundColor:'orange', height: '20%', padding: 10}}>
            <Text>Please select an option:</Text>
            <RadioGroup
            
                radioButtons={radioData}
                onPress={(val) => handleSelect(val)} // Handle selection
                selectedId={selectedId} // Set the selected ID for the RadioGroup
                layout="column" // Layout of the radio buttons (vertical)
                containerStyle={styles.radioGroupContainer} // Container styling
            />
        </View>
    );
};

const styles = StyleSheet.create({
    radioGroupContainer: {
        // marginTop: 10,
    },
});

export default RadioButtonField;
