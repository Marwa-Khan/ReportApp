import { View, Text } from 'react-native'
import React from 'react'
import CheckBox from '@react-native-community/checkbox';

const CheckBoxField = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (
    <View>
      <Text>CheckBoxField</Text>
      <CheckBox
        disabled={false}
        value={{}}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  )
}

export default CheckBoxField