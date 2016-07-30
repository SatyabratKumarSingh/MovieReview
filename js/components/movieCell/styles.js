/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  /*  textContainer: {
     flex: 1,
   },
   movieTitle: {
     flex: 1,
     fontSize: 16,
     fontWeight: '500',
     marginBottom: 2,
   },
   movieYear: {
     color: '#999999',
     fontSize: 12,
   },
   row: {
     alignItems: 'center',
     backgroundColor: 'white',
     flexDirection: 'row',
     padding: 5,
   },
   cellImage: {
     backgroundColor: '#dddddd',
     height: 93,
     marginRight: 10,
     width: 110,
   },
   cellBorder: {
     backgroundColor: 'rgba(0, 0, 0, 0.1)',
     height: StyleSheet.hairlineWidth,
     marginLeft: 4,
   },
   listview: {
     flex: 1,
   },*/
    movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  year: {
    fontSize: 10,
    marginBottom: 8,
    width: 90,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  row: {
     alignItems: 'center',
     //backgroundColor: 'white',
     flexDirection: 'row',
     padding: 5,
   },
    textContainer: {
     flex: 1,
   },
   imageView: {
   	  borderRadius: 10,
     justifyContent: 'center',
     alignItems: 'center',
   },
});
