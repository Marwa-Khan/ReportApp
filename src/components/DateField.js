import { View, Text } from 'react-native'
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import convertTimestampToDate from '../utils/helper';

const DateField = ({dateVal, setDateVal, setFormattedDate}) => {

  // Function to handle date change from the DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDateVal(selectedDate); // Update the state with the new date
      setFormattedDate(convertTimestampToDate(selectedDate.getTime())); // Format the date and update
    }
  };


  return (
    <View>
      
      <DateTimePicker 
                  mode="datetime"
                  value={dateVal}
                  style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  onChange={handleDateChange}
                //   is24Hour={{}}
                //   minuteInterval={{}}
                />
    </View>
  )
}

export default DateField