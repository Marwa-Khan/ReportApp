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
        <View style={styles.container}>
            <Text style={styles.label}>Please select an option:</Text>
            <RadioGroup
            
                radioButtons={radioData}
                onPress={(val) => handleSelect(val)} // Handle selection
                selectedId={selectedId} // Set the selected ID for the RadioGroup
                layout="column" 
                containerStyle={styles.radioGroupContainer} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    radioGroupContainer: {
        paddingVertical: 5,
        alignSelf:'flex-start'
    },
});

export default RadioButtonField;
