import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import styles from './styles';
export default class Home extends Component {
  render() {
      const goToPage = () => Actions.page({text: 'Hello World!'}); 
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