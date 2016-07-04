'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import {openDrawer} from '../../actions/drawer';
import {replaceRoute} from '../../actions/route';
import styles from './styles';

class Home extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#565051'}}>
                <Header style={{backgroundColor: '#322A2A'}} foregroundColor="#fff" >
                    <Button disabled transparent>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    
                    <Title>Home</Title>
                    
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>
                
                <Content padder>
                    <Text style={styles.text}>Welcome!</Text>
                    
                    <Button style={styles.text} onPress={() => this.replaceRoute('login')}>
                        Logout
                    </Button>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
