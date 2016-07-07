/**
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

class MovieReview extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
          style={{flex:1}}
          javaScriptEnabled={true}
          source={{uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0'}}
        />
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

AppRegistry.registerComponent('MovieReview', () => MovieReview);
