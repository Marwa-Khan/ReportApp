import { View, Text } from 'react-native'
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateField = () => {
  return (
    <View>
      <Text>DateField</Text>
      <DateTimePicker
                  mode="time"
                  value={{}}
                  style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  onChange={{}}
                  is24Hour={{}}
                  minuteInterval={{}}
                />
    </View>
  )
}

export default DateField