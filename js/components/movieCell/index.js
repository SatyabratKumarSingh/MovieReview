'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
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
  //  console.log(this.props.movie.thumbnail);
   return (
   /*
     <View>
       <TouchableElement
         onPress={this.props.onSelect}
         onShowUnderlay={this.props.onHighlight}
         onHideUnderlay={this.props.onUnhighlight}>
         <View style={styles.row}>
         <View style={styles.textContainer}>
           <Image
             source={{uri:this.props.movie.thumbnail}}
             style={styles.cellImage}
           />
          </View>
           <View style={styles.textContainer}>
             <Text style={styles.movieTitle} numberOfLines={2}>
               {this.props.movie.title}
             </Text>
             <Text style={styles.movieYear} numberOfLines={1}>
               {this.props.movie.createdDate}
               {' '}&bull;{' '}
             </Text>
           </View>
         </View>
       </TouchableElement>
     </View>
     */
     <View style={styles.movie} >
     <TouchableElement
         onPress={this.props.onSelect}
         onShowUnderlay={this.props.onHighlight}
         onHideUnderlay={this.props.onUnhighlight}>
         <View style={styles.row}>
         	<View style={styles.textContainer}>
         		<View style={styles.imageView}>
          			<Image
            			source={{uri: this.props.movie.thumbnail}}
            			style={styles.thumbnail}
          			/>
          		</View>
          		<View >
            		<Text 
            			style={styles.title}
            			numberOfLines={3}>{this.props.movie.title}</Text>
            			<Text style={styles.year}>{this.props.movie.createdDate}</Text>
          		</View>
          	</View>
         </View>
       </TouchableElement>
    </View>
        
   );
 }
});

module.exports = MovieCell;
