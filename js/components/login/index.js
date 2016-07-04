
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image} from 'react-native';

import {Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import {replaceRoute} from '../../actions/route';
import theme from '../../themes/base-theme';
import styles from './styles';
const { Keyboard } = require('react-native');
const Subscribable = require('Subscribable');
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false
        };
    }
    componentWillMount () {
        // DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        // DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
        // this.addListenerOn(Keyboard, 'keyboardWillShow', this.keyboardWillShow, this);
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);

        // this.addListenerOn(Keyboard, 'keyboardWillHide', this.keyboardWillHide, this);
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height
        this.setState({scroll: true})
    }

    keyboardWillHide (e) {
        this.setState({scroll: false})
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <Content>
                     <View style={styles.img}>
                        <Image source={require('../../../images/movies.png')} style={styles.shadow}>
                        </Image>
                    </View>
                        
                        <View style={styles.bg}>
                                <InputGroup style={{marginBottom: 20}}>
                                    <Icon name="ios-person" />
                                    <Input placeholder="EMAIL" />
                                </InputGroup>
                                <InputGroup style={{marginBottom: 10}}>
                                    <Icon name="ios-unlock-outline" />
                                    <Input
                                        placeholder="PASSWORD"
                                        secureTextEntry={true}
                                    />
                                </InputGroup>
                                <Button style={{marginTop: 20, alignSelf: 'center'}} textStyle={{color: '#fff'}} onPress={() => this.replaceRoute('home')}>
                                    Login
                                </Button>
                            </View>
                    </Content>
                </View>
            </Container>
        )
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(Login);
