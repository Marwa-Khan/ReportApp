import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import convertTimestampToDate from '../utils/helper';

const DateField = ({dateVal, setDateVal, setFormattedDate,setOpenDateCalendar}) => {

  // Function to handle date change from the DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    console.log("selectedDate",selectedDate, "event", event);
    if (event.type === "set") {
      setDateVal(selectedDate); // Update the state with the new date
      setFormattedDate(convertTimestampToDate(selectedDate.getTime())); // Format the date and update
      setOpenDateCalendar(false); 
    }
    if (event.type === "dismissed") {
      setOpenDateCalendar(false); 
    }
    if (event.type === "neutralButtonPressed") {
      setOpenDateCalendar(false); 
    }
  };
  return (
    <View style={styles.container}>
      <DateTimePicker 
                  mode="datetime"
                  value={dateVal}
                //   style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  style={styles.datePicker}
                  onChange={handleDateChange}
               
                //   minuteInterval={{}}
                />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginVertical: 10,
    },
    datePicker: {
      width: 320,
      height: 50,
      marginTop: 10,
    },
  });

export default DateField