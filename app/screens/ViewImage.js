import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";

function ViewImage({ navigation }) {
  const handleNav = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={handleNav}>
        <View style={styles.buttonSecond}>
          <Text style={styles.buttonText}>Screen Second</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSecond: {
    backgroundColor: "tomato",
    width: 250,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ViewImage;
