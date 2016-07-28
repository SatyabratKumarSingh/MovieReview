/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    text: {
        paddingBottom: 20,
        alignSelf: 'center'
    },
    listView: {
    paddingTop: 20,
   // backgroundColor: '#F5FCFF',
  },
});
