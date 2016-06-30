'use strict';

import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    View,
    WebView,
    TouchableHighlight
    } from 'react-native';

var ViewVideo = React.createClass({

    getInitialState: function() {
        return {
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
        };
    },

    render: function() {

        return (
            <View style={styles.container}>
            <TouchableHighlight onPress={ () => this.props.goBack() }>
              <Text>Go Back</Text>
            </TouchableHighlight>
                <Text style={[styles.noResultsText, styles.centerText]}>
                Playing video
                </Text>
                <WebView
                    style={styles.frame}
                    url={this.props.message}
                    renderLoading={this.renderLoading}
                    renderError={this.renderError}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    },
    renderLoading: function () {
        console.log('## webView: loading()');
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>Loading video...</Text>
            </View>
        );
    },
    renderError: function () {
        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noResultsText}>Video not found - 404, {this.props.url}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cccccc',
        flexDirection: 'column'
    },
    centerText: {
        marginBottom:5,
        textAlign: 'center',
    },
    noResultsText: {
        marginTop: 70,
        marginBottom:0,
        color: '#000000',
    },
    frame: {
        marginTop:0
    }
});

module.exports = ViewVideo;
