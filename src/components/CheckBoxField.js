import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "react-native-check-box";

const MultiCheckBoxField = ({ checkBoxData, setCheckBoxData }) => {
    console.log("checkBoxData", checkBoxData);
  const [selectedIds, setSelectedIds] = useState(null);

  // Ensure default selection is correctly set on initial render
  useEffect(() => {
    const preselectedIds = checkBoxData
      ?.filter((item) => item.selected)
      ?.map((item) => item.value);

    setSelectedIds(preselectedIds); // Populate selected IDs based on initial data
  }, [checkBoxData]);

  // Toggle function to handle checkbox clicks
  const toggleCheckbox = (value) => {
    if (selectedIds?.includes(value)) {
      // Remove if already selected
      const updatedSelectedIds = selectedIds?.filter((id) => id !== value);
      setSelectedIds(updatedSelectedIds);
    } else {
      // Add if not selected
      setSelectedIds((prevSelected) => [...prevSelected, value]);
    }

    // Update the checkBoxData state
    setCheckBoxData((prevData) =>
      prevData?.map((checkbox) =>
        checkbox.value === value
          ? { ...checkbox, selected: !checkbox.selected }
          : checkbox
      )
    );
  };


  console.log("selectedIds", selectedIds);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>MultiCheckBox Field</Text>
      {checkBoxData?.map((checkbox) => (
        <View key={checkbox.value} style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkbox}
            onClick={() => toggleCheckbox(checkbox.value)}
            isChecked={selectedIds?.includes(checkbox.value)}
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
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default MultiCheckBoxField;
