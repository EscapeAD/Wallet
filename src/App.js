import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header, Button, CardSection } from './components/common';

export default class App extends Component {
  render() {
    return (
      <View>
        <Header headerText="Wallet"/>
        <CardSection style={styles.container} >
          <Text style={styles.instructions}>
            Welcome to the wallet, Beta, work in progress
          </Text>
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
