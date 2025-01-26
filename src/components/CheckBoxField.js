import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box'; 

const MultiCheckBoxField = () => {
  //  an array of options with their checked states
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'Option 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
  ]);

  // Toggle function to handle checkbox clicks
  const toggleCheckbox = (id) => {
    setCheckboxes((prevState) =>
      prevState.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, isChecked: !checkbox.isChecked }
          : checkbox
      )
    );
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>MultiCheckBox Field</Text>
      {checkboxes.map((checkbox) => (
        <View key={checkbox.id} style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            onClick={() => toggleCheckbox(checkbox.id)}
            isChecked={checkbox.isChecked}
            // leftText={checkbox.label}
          />
          <Text style={styles.label}>{checkbox.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default MultiCheckBoxField;
