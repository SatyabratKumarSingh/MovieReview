'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
var {
  Image,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {Container, Header, Title, Content, Text, Button, Icon, Thumbnail} from 'native-base';
import {replaceRoute} from '../../actions/route';
import styles from './styles';

var MovieCell = React.createClass({
  render: function() {
   var TouchableElement = TouchableHighlight;
   if (Platform.OS === 'android') {
     TouchableElement = TouchableNativeFeedback;
   }
   return (
     <View>
       <TouchableElement
         onPress={this.props.onSelect}
         onShowUnderlay={this.props.onHighlight}
         onHideUnderlay={this.props.onUnhighlight}>
         <View style={styles.row}>
           <Image
             source={getImageSource(this.props.movie, 'det')}
             style={styles.cellImage}
           />
           <View style={styles.textContainer}>
             <Text style={styles.movieTitle} numberOfLines={2}>
               {this.props.movie.title}
             </Text>
             <Text style={styles.movieYear} numberOfLines={1}>
               {this.props.movie.year}
               {' '}&bull;{' '}
             </Text>
           </View>
         </View>
       </TouchableElement>
     </View>
   );
 }
});

module.exports = MovieCell;
