'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Header, Title, Content, Button, Icon } from 'native-base';
import {openDrawer} from '../../actions/drawer';
import {replaceRoute} from '../../actions/route';
import styles from './styles';
import MovieCell from '../movieCell/';

import {
  ActivityIndicator,
  ListView,
  Platform,
  Text,
  StyleSheet,
  View
} from 'react-native';
const firebase = require('firebase');
var FireConfig = require("../../../youtube/config").fbase;
import GridView from 'react-native-grid-view' ;

// Initialize Firebase


var config = {
    apiKey: FireConfig.apiKey,
    authDomain: FireConfig.authDomain,
    databaseURL: FireConfig.kDBBaseRef,
    storageBucket: FireConfig.storageBucket,
  };

  firebase.initializeApp(config);
var db = firebase.database();
// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child(FireConfig.kDBVideoRef);


class Home extends Component {
      constructor(props) {
        console.log("constructor called");
        super(props);
       //  this.state = {
//           dataSource: new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1 !== row2,
//           })
//         };
		this.state = {
     	 	dataSource: null,
      		loaded: false,
    	}
        this.itemsRef = rootRef.child('trailers');
      }

      getRef() {
        return firebase.database().ref();
      }

      listenForItems(itemsRef) {
        console.log("listenForItems called");
      itemsRef.on('value', (snap) => {
        console.log("here");

        // get children as an array
        var movies = [];
        snap.forEach((child) => {
          movies.push({
            title: child.val().title,
            createdDate : child.val().year,
            thumbnail: child.val().posters.packshot,
            _key: child.key
          });
          console.log("-------------------------------");
          console.log(movies);
          console.log("-------------------------------");
        });

        // this.setState({
//           dataSource: this.state.dataSource.cloneWithRows(items)
//         });
			this.setState({
          		dataSource: movies,
          		loaded: true,
        	});

      });
    }

    componentDidMount() {
      this.listenForItems(this.itemsRef);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    renderSeparator(
          sectionID: number | string,
          rowID: number | string,
          adjacentRowHighlighted: boolean
        ) {
          var style = styles.rowSeparator;
          if (adjacentRowHighlighted) {
              style = [style, styles.rowSeparatorHide];
          }
          return (
            <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
          );
      }

      selectMovie(movie: Object) {
          /*if (Platform.OS === 'ios') {
            this.props.navigator.push({
              title: movie.title,
              component: MovieScreen,
              passProps: {movie},
            });
          } else {
            dismissKeyboard();
            this.props.navigator.push({
              title: movie.title,
              name: 'movie',
              movie: movie,
            });
          }*/
          console.log("select movie is called");
        }

    render() {
    	if (!this.state.loaded) {
      		return this.renderLoadingView();
    	}
        return (
            <Container style={{backgroundColor: '#33AA99'}}>
                <Header style={{backgroundColor: '#3D9970'}} foregroundColor="#fff" >
                    <Button disabled transparent>
                        <Icon name="ios-arrow-back" />
                    </Button>

                    <Title>Home</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>

                <Content padder>
                <GridView
        			items={this.state.dataSource}
        			itemsPerRow={3}
        			renderItem={this.renderRow}
        			style={styles.listView}
      			/>
                </Content>
            </Container>
        );
    }
    renderLoadingView() {
    	return (
      	<View>
       	 <Text>
       	   Loading movies...
      	  </Text>
     	 </View>
   	 );
  	}
        renderRow(
            movie: Object,
            sectionID: number | string,
            rowID: number | string,
            highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
          ) {
            return (
              <MovieCell
                key={movie.id}
                onSelect={() => this.selectMovie(movie)}
                onHighlight={() => highlightRowFunc(sectionID, rowID)}
                onUnhighlight={() => highlightRowFunc(null, null)}
                movie={movie}
              />
            );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
