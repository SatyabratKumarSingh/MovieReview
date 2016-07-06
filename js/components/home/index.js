'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import {openDrawer} from '../../actions/drawer';
import {replaceRoute} from '../../actions/route';
import styles from './styles';

const firebase = require('firebase');
var FireConfig = require("../../youtube/config").fbase;
// Initialize Firebase
var config = {
    apiKey: FireConfig.apiKey,
    authDomain: FireConfig.authDomain,
    databaseURL: FireConfig.kDBBaseRef,
    storageBucket: FireConfig.storageBucket,
  };
  firebase.initializeApp(config);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child(FireConfig.kDBVideoRef);


class Home extends Component {
      constructor(props) {
        super(props);
        this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          })
        };
        this.itemsRef = this.getRef().child('videos');
      }
      getRef() {
        return firebaseApp.database().ref();
      }
      listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            title: child.val().title,
            createdDate : child.val().createdDate,
            thumbnail: child.val().thumbnail.url,
            _key: child.key
          });
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items)
        });

      });
    }

    componentDidMount() {
      this.listenForItems(this.itemsRef);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    renderSeparator: function(
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
      },
      selectMovie: function(movie: Object) {
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
        },
    render() {
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
                <ListView
                     ref="listview"
                     renderSeparator={this.renderSeparator}
                     dataSource={this.state.dataSource}
                     renderRow={this.renderRow}
                     automaticallyAdjustContentInsets={false}
                     keyboardDismissMode="on-drag"
                     keyboardShouldPersistTaps={true}
                     showsVerticalScrollIndicator={false}
                />;
                </Content>
            </Container>
        )
    }
        renderRow: function(
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
    },
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
