/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ReactPlayer from 'react-player';
import Video from "react-h5-video";
<link rel="stylesheet" type="text/css" href="node_modules/react-h5-video/lib/react-h5-video.css">


class MovieReviewApp extends React.Component{
    render(){
        var sources = [ "https://www.youtube.com/watch?v=UPZ5FKEB02I" ]
        return(
            <Video sources={sources} poster="https://en.wikipedia.org/wiki/Mohenjo_Daro_(film)#/media/File:Mohenjo_Daro_first_look_poster.jpg" >
                <h3 className="video-logo pull-right"><a href="http://glexe.com" target="_blank">LOGO</a></h3>
                <p>Any HTML content</p>
            </Video>
        )
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

AppRegistry.registerComponent('MovieReviewApp', () => MovieReviewApp);
