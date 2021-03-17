import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import Customers from "./app/screens/Customers";
import Transactions from "./app/screens/Transactions";
import Transaction from "./app/screens/Transaction";
import Transfer from "./app/screens/Transfer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const { landscape } = useDeviceOrientation();

  const handlePress = () => {
    console.log("Text Pressed");
    Alert.alert("My Title", "My Message", [
      {
        text: "Yes",
        onPress: () => {
          console.log("Yes");
        },
      },
      {
        text: "Save Change",
        onPress: () => {
          console.log("Save Change");
        },
      },
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Banking System" component={WelcomeScreen} />
        <Stack.Screen name="Customers" component={Customers} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Transfer" component={Transfer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
