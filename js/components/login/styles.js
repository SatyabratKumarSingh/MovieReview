/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#33AA99'
    },
    shadow: {
    //    flex: 1,
        width: 128,
        height: 128,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    bg: {
        flex: 1,
        //marginTop: deviceHeight/1.75,
        backgroundColor: '#33AA99',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        bottom: 0
    },
    img:{
            paddingTop: 40,
           justifyContent: 'center',
           alignItems: 'center'
         }
});
