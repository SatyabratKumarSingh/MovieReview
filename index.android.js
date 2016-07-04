'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  WebView,
  TouchableHighlight
}from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import Page from './components/page';
import Home from './components/home';


var MovieReview = React.createClass({
    render() {
    return (
      <Router sceneStyle={{backgroundColor:'#2CC0B3'}}>
        <Scene key="root" style={ styles.navigate }>
          <Scene key="home" style={ styles.navigate } component={Home} title="Home" initial={true} />
          <Scene key="page" component={Page} title="Page" />
        </Scene>
      </Router>
    )
    }
 
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60
  },
  button: {
  	height: 50,
    backgroundColor: '#ededed',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
   containerWebView: {
    flex: 1,
  },
  navigate:{
      backgroundColor: '#2CC0B3'
  }
});

AppRegistry.registerComponent('MovieReview', () => MovieReview);
