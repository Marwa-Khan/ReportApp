import { View, Text } from 'react-native'
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import convertTimestampToDate from '../utils/helper';

const DateField = ({dateVal, setDateVal}) => {



  return (
    <View>
      <Text>DateField</Text>
      <DateTimePicker 
                  mode="datetime"
                  value={dateVal}
                  style={{width: 300, opacity: 1, height: 30, marginTop: 50}}
                  onChange={(date)=> {setDateVal(convertTimestampToDate(date.nativeEvent.timestamp))}}
                //   is24Hour={{}}
                //   minuteInterval={{}}
                />
    </View>
  )
}

export default DateField