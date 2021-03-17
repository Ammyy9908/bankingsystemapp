import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
} from "react-native";

function WelcomeScreen({ navigation }) {
  const moveToCustomerList = () => {
    navigation.navigate("Customers");
  };

  const moveToTransactions = () => {
    navigation.navigate("Transactions");
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Info", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={moveToCustomerList}>
        <View style={styles.customerButton}>
          <Text style={styles.buttonText}>View Customers</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={moveToTransactions}>
        <View style={styles.transactionButton}>
          <Text style={styles.buttonText}>All Transactions</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customerButton: {
    backgroundColor: "dodgerblue",
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 65,
    marginBottom: 10,
  },
  transactionButton: {
    backgroundColor: "teal",
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 65,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default WelcomeScreen;
