import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { React, useEffect, useState } from "react";
import SingleLineTextInput from "../../components/SingleLineTextInput";
import MultiLineTextInput from "../../components/MultiLineTextInput";
import DropDownField from "../../components/DropDownField";
import CheckBoxField from "../../components/CheckBoxField";
import DateField from "../../components/DateField";
import { ApiEndPoint, baseURL } from "../../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioButtonField from "../../components/RadioButtonField";

const { width, height } = Dimensions.get("window");
const FormScreen = () => {
  const [loading, setLoading] = useState(false);
  const [dateVal, setDateVal] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [APIData, setAPIData] = useState({});

  const [textData, setTextData] = useState("");
  const [multiText, setMultiText] = useState("");
  const [formType, setFormType] = useState("");
  const [openDateCalendar, setOpenDateCalendar] = useState(false);
  const [radioData, setRadioData] = useState([
    {
      label: "Option 1",
      selected: false,
      value: "option-1",
    },
    {
      label: "Option 2",
      selected: false,
      value: "option-2",
    },
    {
      label: "Option 3",
      selected: false,
      value: "option-3",
    },
  ]);

  const [dropDownData, setDropDownData] = useState([
    { label: "Monday", value: "Option1" },
    { label: "Tuesday", value: "Option2" },
    { label: "Wednesday", value: "Option3" },
    { label: "Thursday", value: "Option4" },
    { label: "Friday", value: "Option5" },
    { label: "Saturday", value: "Option6" },
    { label: "Sunday", value: "Option7" },
  ]);

  const [checkBoxData, setCheckBoxData] = useState(null);
  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("hei from useEffect");
        const token = await AsyncStorage.getItem("userToken");
        console.log("Retrieved token:", token);
        // Call fetchForm() after getting the token
        fetchForm(token);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    initialize(); // Call the async function
  }, []);
  const fetchForm = async (token) => {
    console.log("Fetching token inside fetchform:", token); // Log the fetch operation
    // setLoading(true);
    try {
      const FormApiEndpoint = `${baseURL}${ApiEndPoint.GetFormApi}/34`;
      const response = await fetch(FormApiEndpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data fetched successfully on form screen!");
      const rawResponse = await response.json(); // Get the response as text
      console.log("Raw Response:", rawResponse); // Log the raw response
      setFormType(rawResponse.type);
      console.log("Form Type:", rawResponse.type);
      const parsedData = JSON.parse(rawResponse.data); // Parse the string into a JavaScript array
      setAPIData(parsedData);
      console.log(
        "Parsed Data:",
        parsedData.map((item) => item.type)
      );
      // const textFields = APIData.map(item=>{
      //    console.log(item.filter((item) => item.type === "text"))
      // })
      parsedData.map((item) => {
        if (item.type === "text") {
          setTextData(item.label);
          console.log("Text Data:", item);
        }
        if (item.type === "textarea") {
          console.log("MultiLine Text:", item);
          setMultiText(item.label);
        }
        if (item.type === "select") {
          console.log("Checkbox Data:", item);
          setCheckBoxData(item.values);
        }
        if (item.type === "radio-group") {
          console.log("Radio Data:", item);

          // Add unique 'id' for each option in the 'values' array
          const radioDataWithIds = item.values.map((value, index) => ({
            ...value,
            id: index, // Unique ID based on index
          }));
          setRadioData(radioDataWithIds);
          console.log("radio Data with ids:", radioData);
        }
      });
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };




  return (
      <ScrollView
        style={styles.scrollView}
       
        
      >
    <View style={styles.container}>
        <Text style={styles.label}>FormScreen</Text>

        {/* Components */}
        <SingleLineTextInput textData={textData} setTextData={setTextData} />
        <MultiLineTextInput
          multiText={multiText}
          setMultiText={setMultiText}
        />
        <DropDownField
          dropDownData={dropDownData}
          setDropDownData={setDropDownData}
        />
        <CheckBoxField
          checkBoxData={checkBoxData}
          setCheckBoxData={setCheckBoxData}
        />
        
        <RadioButtonField radioData={radioData} setRadioData={setRadioData} />
         <Text style={{ marginBottom: 10 }}>
          Selected Date: {formattedDate || "No date selected"} 
        </Text>
        
        <TouchableOpacity onPress={()=>setOpenDateCalendar(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity> 
        {/* Uncomment if DateField is needed */}
      {openDateCalendar &&  <DateField dateVal={dateVal} setDateVal={setDateVal} setFormattedDate={setFormattedDate} setOpenDateCalendar={setOpenDateCalendar} />}
       
    </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "pink",
    marginBottom:100
  },
  scrollView: {
    flex:1,
    backgroundColor:"yellow",
    // Do not use flex: 1 here
    width: "100%",
    paddingBottom:100
  },
  contentContainer: {
    flex: 1, // Allow content to grow dynamically
    // paddingBottom: 120, // Add spacing to avoid cutting off content
    // paddingHorizontal: width * 0.05,
    // backgroundColor: "blue",

  },
  label: {
    fontSize: width * 0.05,
    marginBottom: height * 0.02,
  },
});

export default FormScreen;