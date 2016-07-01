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
var Button = require('react-native-button');
var VideoWebView = require('./VideoWebView');
var WebViewAndroid = require('react-native-webview-android');
var MovieReview = React.createClass({

  _renderScene(route, navigator) {
  	 var routeId = route.id;

     if (routeId === 'Home') {
         return (<Home navigator={navigator}/>);
     }

    if (routeId === 'Login') {
    	   return (<Login {...route.passProps} navigator={navigator}/>);
    }

     if (routeId === 'About') {
         return (<About {...route.passProps} navigator={navigator}/>);
     }
     if (routeId === 'Play') {
         return (<VideoWebView {...route.passProps} navigator={navigator}/>);
     }
  },

  render: function() {
    return (
      <Navigator
  			initialRoute={{ id:'Home', name: 'Home', component: Home }}
      	renderScene={ (route, navigator) => this._renderScene(route, navigator) }
   		/>
    );
  }
});

var About = React.createClass({
	render() {
  	return (
    	<View style={ styles.container }>
      	<TouchableHighlight onPress={ () => this.props.goBack() }>
      		<Text>Go Back</Text>
      	</TouchableHighlight>
      	<Text>Hello from About</Text>
      	<Text>{ this.props.message }</Text>
      </View>
    )
  }
})

var Login = React.createClass({
	render() {
  	return (
    	<View style={ styles.container }>
      	<TouchableHighlight onPress={ () => this.props.goBack() }>
      		<Text>Go Back</Text>
      	</TouchableHighlight>
      	<Text>Hello from Login</Text>
      	<Text>{ this.props.message }</Text>
      </View>
    )
  }
})

var Play = React.createClass({
	render() {
  	return (
    	<View style={ styles.container }>
      	<TouchableHighlight onPress={ () => this.props.goBack() }>
      		<Text>Play</Text>
      	</TouchableHighlight>
      	<Text>Hello from Play</Text>
      	<Text>{ this.props.message }</Text>
      </View>
    )
  }
})

var Home = React.createClass({

  navigate(id, message) {
  	this.props.navigator.push({
    	id: id,
      passProps: {
      	message: message,
        goBack: this.goBack,
      }
    })
  },

    goBack() {
    	this.props.navigator.pop()
    },

	render() {
                var html = '<!DOCTYPE html><html><body><iframe width="300" height="300" src="http://www.youtube.com/embed/lSPVcI2AYbs"></iframe></body></html>';

  	return (
    	<View style={ styles.container }>
      	<Text>Hello from Home</Text>
      	<TouchableHighlight onPress={ () => this.navigate('About', 'This is the about page!') } style={ styles.button }>
      		<Text>GO TO ABOUT</Text>
        </TouchableHighlight>
      	<TouchableHighlight onPress={ () => this.navigate('Login', 'This is the login page!') } style={ styles.button }>
      		<Text>GO TO Login</Text>
        </TouchableHighlight>
            <TouchableHighlight onPress={ () => this.navigate('Play', 'https://www.youtube.com/watch?v=RJa4kG1N3d0') } style={ styles.button }>
          <Text>GO TO Play</Text>
        </TouchableHighlight>
      </View>
    )
  },
  selectVideo() {
    var domain = 'https://www.youtube.com';
    this.props.navigator.push({
        title: 'Playing',
        component: Play,
        passProps: {
          //  video: video,
          url: 'https://www.youtube.com/watch?v=y2O44HDZWws'
          //  url: domain +'/embed/'+ 'hrcICKdEkYQ' +'?autoplay=1' // domain+'/watch?v='+video.videoId
          //  https://www.youtube.com/embed/xyfdO1L2vgQ?autoplay=1
        }
    });
}
})

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
  }
});

AppRegistry.registerComponent('MovieReview', () => MovieReview);
