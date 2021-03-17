import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ProgressBarAndroid,
  ScrollView,
} from "react-native";

function TransactionCard({ from, navigation, to, amount, timestamp }) {
  return (
    <View style={styles.customeCardStyle}>
      <Text style={styles.userText}>{from.name}</Text>
      <Text>Reciever:{to.name}</Text>
      <Text>Amount:Rs {amount}</Text>
      <Text>Date:{timestamp}</Text>
    </View>
  );
}

function Transactions({ props }) {
  let [users, setUsers] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://bankingsystemgrid.herokuapp.com/transactions"
      );
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

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
            {users.map((transaction) => {
              return (
                <TransactionCard
                  from={transaction.from}
                  to={transaction.to}
                  amount={transaction.amount}
                  timestamp={transaction.timestamp}
                  key={transaction._id}
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCenter: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
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
export default Transactions;
