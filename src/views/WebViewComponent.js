/**
 * Created by laker on 15/11/2016.
 */
import React, {Component} from "react";
import {WebView, View, Text, Platform, Dimensions} from "react-native";
import BackComponent from "../components/BaseComponent";
import ProgressView from "./ProgressView";

var mounted;
class WebViewComponent extends BackComponent {
    canGoback = false;
    tag = {};
    num = 0;

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if ((event.id == 'backButton') || (event.id == 'backPress')) { // this is the same id field from the static navigatorButtons definition
                mounted = false;
                if (this.canGoback) {
                    this.refs['webView'].goBack();
                } else if (this.props.popToRoot) {
                    this.props.navigator.popToRoot()
                } else {
                    this.props.navigator.pop();
                }
            } else if (event.id == 'closeButton') {
                if (this.props.popToRoot) {
                    this.props.navigator.popToRoot()
                } else {
                    this.props.navigator.pop();
                }
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            progress: 0.0,
        };

    }

    componentDidMount() {
        mounted = true;
    }

    componentWillUnmount() {
        mounted = false;
        this.props.callback && this.props.callback();
    }

    errorView() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{fontSize: 16, color: 'gray'}}>网页加载失败</Text>
            </View>
        );
    }

    onShouldStartLoadWithRequest(event) {
        if (event.url.startsWith('ctrip')) {
            return false;
        }
        var progress = this.state.progress + 0.05;
        if (progress > 0.85) {
            progress = 0.85;
        }
        this.setState({
            progress,
        });
        return true;
    }

    onEnd() {
        this.setState({progress: 1});
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 100);
    }

    onStart() {
        this.setState({
            progress: 0.1,
            isLoading: true,
        });
    }

    onNavigationStateChange(navState) {
        if (this.num == 0 && navState.title != '') {
            this.num = 1;
            this.tag = {
                title: navState.title,
                url: navState.url,
            }
        }
        if (this.tag.title == navState.title && this.tag.url == navState.url) {
            this.canGoback = false;
        } else {
            this.canGoback = navState.canGoBack;
        }
        if (!mounted) {
            return;
        }
        if (Platform.OS == 'android') {
            if (this.canGoback) {
                this.props.navigator.setButtons({
                    rightButtons: [{
                        id: 'closeButton',
                        icon: require('../../img/icon_home.png'),
                        title: '关闭',
                    }],
                });
            }
        }
        else {
            if (this.canGoback) {
                this.props.navigator.setButtons({
                    leftButtons: [{
                        icon: require('../../img/back_white_button.png'),
                        id: 'backButton',
                        title: '返回',
                    }, {
                        id: 'closeButton',
                        icon: require('../../img/icon_home.png'),
                        title: '关闭',
                    }]
                });
            } else {
                this.props.navigator.setButtons({
                    leftButtons: [{
                        icon: require('../../img/back_white_button.png'),
                        id: 'backButton',
                        title: '返回',
                    }],
                });
            }
        }

        this.setState({
            isLoading: navState.loading,
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: this.props.moduleUrl}}
                    style={{flex: 1}}
                    ref={'webView'}
                    onLoad={this.onEnd.bind(this)}
                    onLoadEnd={this.onEnd.bind(this)}
                    onLoadStart={this.onStart.bind(this)}
                    onError={()=> {
                        this.setState({isLoading: false})
                    }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    automaticallyAdjustContentInsets={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
                    renderError={this.errorView.bind(this)}
                />
                {this.state.isLoading &&
                <ProgressView
                    fillStyle={{backgroundColor: "#148ED6"}}
                    backgroundStyle={{backgroundColor: '#FFFFFF00'}}
                    style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width}}
                    easingDuration={200}
                    progress={this.state.progress}
                />}
            </View>
        );
    }
}


module.exports = WebViewComponent;