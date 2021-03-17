import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  ProgressBarAndroid,
  Clipboard,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";

function CustomerCard({ user, account_number, balance, id, navigation }) {
  const handleTransaction = () => {
    navigation.navigate("Transaction", {
      uid: id,
    });
  };

  const handleTransfer = () => {
    navigation.navigate("Transfer", {
      uid: id,
      user,
      balance,
      account_number,
    });
  };

  const handleCopy = () => {
    Clipboard.setString(account_number);
    ToastAndroid.showWithGravityAndOffset(
      "Account Number Copied",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  return (
    <View style={styles.customeCardStyle}>
      <Text style={styles.userText}>{user}</Text>
      <Text>sb78639@gmail.com</Text>
      <TouchableWithoutFeedback onPress={handleCopy}>
        <View>
          <Text style={{ fontSize: 20 }}>{account_number}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Text>Rs.{balance}</Text>
      <View style={{ marginBottom: 10 }}>
        <Button
          title="Transfer Money"
          color="#f50057"
          onPress={handleTransfer}
        />
      </View>

      <Button
        title="View Transaction"
        color="#000"
        onPress={handleTransaction}
      />
    </View>
  );
}
function Customers({ navigation }) {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://bankingsystemgrid.herokuapp.com/users"
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.warn(JSON.stringify(error, null, 2));
        });
    });
    return unsubscribe;
  }, [navigation]);
  let demoUsers = [1, 2, 3, 4, 5];
  let [users, setUsers] = React.useState(null);

  useEffect(() => {
    fetchData()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.warn(JSON.stringify(error, null, 2));
      });
  }, []);

  return (
    <View style={users ? styles.container : styles.containerCenter}>
      {users ? (
        <>
          <ScrollView style={styles.scrollStyles}>
            {users.map((user) => {
              return (
                <CustomerCard
                  user={user.name}
                  account_number={user.account_number}
                  balance={user.balance}
                  key={user._id}
                  id={user._id}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </>
      ) : (
        <View>
          <ProgressBarAndroid styleAttr="LargeInverse" color="#000" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fab_button: {
    width: 55,
    height: 55,
    backgroundColor: "#f50057",
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerCenter: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  userText: {
    fontSize: 22,
  },
  scrollStyles: {
    width: "100%",
    margin: 0,
  },
  customeCardStyle: {
    width: "95%",
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    elevation: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Customers;
