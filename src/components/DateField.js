import { View, Text } from 'react-native'
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
      setOpenDateCalendar(false); // Close the date picker
    }
    if (event.type === "dismissed") {
      setOpenDateCalendar(false); // Close the date picker
    }
    if (event.type === "neutralButtonPressed") {
      setOpenDateCalendar(false); // Close the date picker
    }
  };
  return (
    <View>
      <DateTimePicker 
                  mode="datetime"
                  value={dateVal}
                  style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  onChange={handleDateChange}
               
                //   minuteInterval={{}}
                />
    </View>
  )
}

export default DateField