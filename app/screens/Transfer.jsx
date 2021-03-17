import React from 'react'
import { View ,StyleSheet, Text,TextInput, Button,TouchableWithoutFeedback, Alert} from 'react-native'

import axios from 'axios';
export default function Transfer({ route, navigation }) {

    const {user,balance,account_number,uid} = route.params;
    const [accountNumber,onChangeTextAccountNumber] = React.useState('');
    const [ubalance,setBalance] = React.useState(balance);
    const [value,onChangeText] = React.useState('')




    const handleTransfer = async () =>{
        if(value || accountNumber){
            try{
                const r = await axios.put('https://bankingsystemgrid.herokuapp.com/transfer',{from:account_number,to:accountNumber,amount:value,timestamp:new Date().getTime()})
                if(r.status===200){
                    navigation.navigate("Customers");
                }
            }
            catch(e){
                if(e.response || e.response.data){
                    Alert.alert("Error",e.response.data.message);
                }
            }
        }
    }

    //1611297309269
    // 1611297326009
    
    return (
        <View style={styles.container}>
            <View style={styles.InfoCard}>
                <Text style={styles.userText}>{user}</Text>
                <Text style={styles.balanceText}>Balance: Rs {ubalance}</Text>
                <View style={{top:25,left:10}}>
                <Text style={{marginBottom:10}}>Enter Recipient Account Number</Text>
                <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:'90%',borderRadius:5,paddingLeft:10}}
        onChangeText={text => onChangeTextAccountNumber(text)}
        value={accountNumber}
      />
                <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1,width:'90%',borderRadius:5,paddingLeft:10,top:10}}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
               
               <TouchableWithoutFeedback onPress={+value<=+balance && accountNumber ?handleTransfer:null}>
               <View style={+value<=+balance && value.length>0 && accountNumber.length>0?styles.transferBtn:styles.disbaledButton}>
                   <Text style={styles.buttonText}>Transfer</Text></View>
               </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disbaledButton:{
        width:'90%',
        height:45,
        backgroundColor:'#cccc',
        alignItems: "center",
        justifyContent: "center",
        marginTop:25

    },
    userText:{
        fontSize:35,
        top:10,
        left:10
    },
    transferBtn:{
        width:'90%',
        height:45,
        backgroundColor:'#f50057',
        alignItems: "center",
        justifyContent: "center",
        marginTop:25
        
    },
    buttonText:{
        color:'#fff',
        fontSize:20
    },
    balanceText:{
        fontSize:30,
        fontWeight:"bold",
        top:10,
        left:10
    },
    InfoCard:{
        width:'90%',
        height:350,
        position:'absolute',
        borderRadius:10
    }
})