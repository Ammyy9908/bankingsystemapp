import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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

export default function Transaction({ route, navigation }) {
  const [transactions, setTransaction] = React.useState(null);

  const { uid } = route.params;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://bankingsystemgrid.herokuapp.com/transaction/${uid}`
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
        setTransaction(data.userTransaction);
      })
      .catch((error) => {
        console.warn(JSON.stringify(error, null, 2));
      });
  }, []);

  return (
    <View style={styles.container}>
      {transactions && transactions.length > 0 ? (
        <ScrollView style={styles.scrollStyles}>
          {transactions.map((transaction) => {
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
      ) : (
        <View>
          <Text style={{ fontSize: 35 }} numberOfLines={1}>
            Loading Transactions
          </Text>
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
    paddingLeft: 10,
    paddingRight: 10,
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
  userText: {
    fontSize: 22,
  },
});
