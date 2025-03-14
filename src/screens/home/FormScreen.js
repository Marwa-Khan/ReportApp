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
  Button,
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
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const FormScreen = () => {

  const navigation = useNavigation();
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
  const [checkBoxData, setCheckBoxData] = useState(null);
  const [token, setToken] = useState("");
  const [uuid, setUuid] = useState("Te8q9");
  const [logOut,setLogOut] = useState(true);

  const [dropDownData, setDropDownData] = useState([
    { label: "Monday", value: "Option1" },
    { label: "Tuesday", value: "Option2" },
    { label: "Wednesday", value: "Option3" },
    { label: "Thursday", value: "Option4" },
    { label: "Friday", value: "Option5" },
    { label: "Saturday", value: "Option6" },
    { label: "Sunday", value: "Option7" },
  ]);

  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("hei from useEffect");
        const token1 = await AsyncStorage.getItem("userToken");
        console.log("Retrieved token:", token1);
        // Call fetchForm() after getting the token
        setToken(token1);
        fetchForm(token1);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    initialize(); // Call the async function
  }, []);

//   fields data fetch from API
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

  //   submit form data to APi
  const postData = async () => {
    // console.log("Token data in post:", token);
    setLoading(true); // Indicate loading

    // const currentTime = new Date().toISOString(); // Current time in ISO format
    // console.log("Current Time:", currentTime);

    try {
      const response = await fetch(`${baseURL}${ApiEndPoint.PostFormDataApi}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            userid: "772", // User ID from login API response
            sitename: "Test Site", // Hardcoded site name
            site_id: 1, // Static site ID
            time: new Date().toISOString(), // Current time in ISO format
            data: JSON.stringify([
              { type: "text", label: textData },
              { type: "textarea", label: multiText },
              { type: "select", label: dropDownData },
              { type: "radio-group", label: radioData },
              { type: "checkbox", label: checkBoxData }
            ]), // Form data stringified
            comment: "This is a test comment", // Dummy comment for the report
            type: "incident", // Report type
            images: "", // Blank as required
            lati: "", // Blank as required
            longi: "", // Blank as required
          }),
          
      });
      if (response.status === 200) {
        const jsonResponse = await response.json();
        console.log("Form submitted successfully:", jsonResponse);
        // Alert.alert("Success", "Form submitted successfully!");
        Alert.alert('Alert', 'Confirm Form Submission', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => setLogOut(false)},
          ]);
      
      } else {
        const errorResponse = await response.text(); // Read server error response
        console.error("Failed to submit form:", response.status, errorResponse);
        Alert.alert(
          "Error",
          `Failed to submit form. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


//   log out function


const logout = async () => {
    try {
      // Send POST request to the logout endpoint
      const response = await fetch(`${baseURL}${ApiEndPoint.logoutApi}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // current token for authorization
        },
      });

      console.log("check logout response:", response);
  
      // Check if the response is successful
      if (response.ok) {
        // Clear token and user data from local storage
        await AsyncStorage.removeItem("userToken"); // Clear token
        await AsyncStorage.removeItem("userData"); // Clear user data
        console.log("Logout successful!");
        console.log("getting token after logout to check:", await AsyncStorage.getItem('userToken'));

        
        Alert.alert("Success", "You have logged out successfully.");
        navigation.navigate("Auth")
      } else {
        const errorResponse = await response.text();
        console.error("Failed to logout:", response.status, errorResponse);
        Alert.alert("Error", `Logout failed. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };
  

  return (

   
    <ScrollView style={styles.scrollView}>
        { logOut ?
    

      <View style={styles.container}>
        <Text style={styles.label}>Form Screen</Text>
        {/* Components */}
        <SingleLineTextInput textData={textData} setTextData={setTextData} />
        <MultiLineTextInput multiText={multiText} setMultiText={setMultiText} />
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
        <TouchableOpacity
          onPress={() => setOpenDateCalendar(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity>
        
        {openDateCalendar && (
          <DateField
            dateVal={dateVal}
            setDateVal={setDateVal}
            setFormattedDate={setFormattedDate}
            setOpenDateCalendar={setOpenDateCalendar}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={postData}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      :
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logout} onPress={()=>  (logout())}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      
        </View>



}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#f5f5f5", 
      paddingHorizontal: 20,
      paddingBottom: 20,
    //   justifyContent: 'center',
    //   alignItems:'center'
    },
    scrollView: {
      flex: 1,
      backgroundColor: "#ffffff",
      width: "100%",
      paddingBottom: 20,
    },
    label: {
      fontSize: width * 0.06, 
      fontWeight: "600", 
      color: "#333",
      marginBottom: 10,
      marginTop: 10, 
    },
    inputFields: {
      marginBottom: 20,
    },
 
    
   
    button: {
      backgroundColor: "#4A90E2",
      padding: 12,
      borderRadius: 12,
      marginVertical: 15,
      width: "60%",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "500",
    },
    logoutContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff9f9", 
      height: height,
      paddingHorizontal: 20,
    },
    logout: {
      backgroundColor: "#4A90E2", 
      padding: 12,
      borderRadius: 12,
      marginVertical: 15,
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    logoutText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
    },
    dateButton: {
      backgroundColor: "#D1E8FF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginVertical: 15,
      alignSelf: "center",
      borderWidth: 1,
      borderColor: "#4A90E2",
    },
    dateButtonText: {
      fontSize: 16,
      color: "#4A90E2",
      textAlign: "center",
    },
  });
  
  
  

export default FormScreen;
