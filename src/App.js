import '../shim';
import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Header, Button, CardSection, Card } from './components/common';
import Bitcoin from 'react-native-bitcoinjs-lib';
import Base58 from 'base58';
import axios from 'axios';




export default class App extends Component {
  
  state = {bitcoinAdresss: "no Data", keypairdata: "no Data", privateKey: "none", balance: "no Data",n_tx: "no Data", total_received: "no Data"}

  componentWillMount(){
    AsyncStorage.getItem('@CurrentStore').then((store)=>{
      if(store){
        this.setState(store)
      }
    })
  }
  
  checking_keybase58(input){
    let key   = Bitcoin.ECPair.fromWIF(input);
    let addr  = key.getAddress();
    return addr
  }

  createBitcoinKey(){
    const keypair = Bitcoin.ECPair.makeRandom();
    const address = keypair.getAddress();
    const privateKey = keypair.toWIF();

    // pull balance
    this.pullBalance(address);
    
    // Set state of everything
    this.setState({
                  bitcoinAdresss: address,
                  keypairdata: keypair,
                  privateKey: privateKey,
                  })
                  
    // console.log(keypair)
    if(this.state.keypairdata != 'none'){
      console.log(this.state.keypairdata.toWIF())
    }
  }
  
  pullBalance(address){
    axios.get(`https://blockchain.info/balance?active=${address}`)
         .then((response) => {
           this.setState({
                         balance: response.data[address].final_balance,
                         n_tx: response.data[address].n_tx,
                         total_received: response.data[address].total_received
                         })
         })
         .catch(function (error) {
           console.log(error);
         });  
  }
  
  saveState(){
      AsyncStorage.setItem('@CurrentStore', this.state);
  }
  
  render() {
    const { bitcoinAdresss, keypairdata, privateKey } = this.state;
    return (
      <View>
        <Header headerText="Wallet"/>
        <CardSection>
          <Text>
            Welcome to the wallet, Beta, work in progress
          </Text>
        </CardSection>
              <CardSection>
                <Button onPress={()=> {this.createBitcoinKey()
          }}>
                  Create bitcoin key
                </Button>
              </CardSection>
              <Text>
              Public Key: 
              </Text>
              <Text>
              {bitcoinAdresss}             
             </Text>
             
              <Text>
              Private Key:  
              </Text>
              <Text>
              { keypairdata != "no Data" ? keypairdata.toWIF() : keypairdata }  
              </Text>
              
              <Text>
              Other:
              </Text>
              <Text>
              {keypairdata != "no Data" ? keypairdata.getPublicKeyBuffer() : keypairdata}
              </Text>
              
              <Text>
              prefix: 
              </Text>
              <Text>
              {keypairdata != "no Data" ? keypairdata.getNetwork().messagePrefix.split(':')[0] : keypairdata}
              </Text>
              
              <Text>
              if we got the key can we transfer it back?: 
              </Text>
              <Text>
              {keypairdata != "no Data" ? this.checking_keybase58(keypairdata.toWIF()) : keypairdata} 
              </Text>
              
              <Text>
              Balance check via blockchain.info: 
              </Text>
              
              <Text>
              {this.state.balance} 
              </Text>
              <Text>
              n_tx: 
              </Text>
              
              <Text>
              {this.state.balance} 
              </Text>
              <Text>
              total_received: 
              </Text>
              
              <Text>
              {this.state.balance} 
              </Text>
              
              <CardSection>
                <Button onPress={()=> {this.saveState()}}>
                  Save BitCoin Key
                </Button>
              </CardSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
