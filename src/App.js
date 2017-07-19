import '../shim';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, CardSection, Card } from './components/common';
import Bitcoin from 'react-native-bitcoinjs-lib';

export default class App extends Component {
  state = {bitcoinAdresss: 'none', keypairdata: 'none'}

  // renderbase(){
  //   const bitcoinAdresss = this.state;
  //   console.log(bitcoinAdresss)
  // 
  //   if(bitcoinAdresss != 'none'){
  //     return (
  //       <CardSection>
  //         <Button onPress={()=> {this.setState({bitcoinAdresss: 'WTF'})
  //   }}>
  //           Create bitcoin key
  //         </Button>
  //       </CardSection>
  //     )
  //   } else {
  //     return (
  //       <Card>
  //       <CardSection style={styles.container} >
  //         <Text style={styles.instructions}>
  //           Current Private key: {this.state.bitcoinAdresss}
  //         </Text>
  //       </CardSection>
  //       </Card>
  //           )
  //   }
  // }
  // 
  createBitcoinKey(){
    const keypair = Bitcoin.ECPair.makeRandom();
    const address = keypair.getAddress();
    this.setState({bitcoinAdresss: address})
    this.setState({keypairdata: keypair})
    // console.log(keypair)
    if(this.state.keypairdata != 'none'){
      console.log(this.state.keypairdata.toWIF())
    }
  }
  
  render() {
    const {bitcoinAdresss, keypairdata } = this.state;
    
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
              { keypairdata != 'none' ? keypairdata.toWIF() : keypairdata }  
              </Text>
              <Text>
              Other:
              </Text>
              <Text>
              {keypairdata != 'none' ? keypairdata.getPublicKeyBuffer() : keypairdata}
              </Text>
              <Text>
              prefix: 
              </Text>
              <Text>
              {keypairdata != 'none' ? keypairdata.getNetwork().messagePrefix : keypairdata} 
              </Text>

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
