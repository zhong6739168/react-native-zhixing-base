/**
 * Created by zhongxy on 2017/07/24.
 */
'use strict';

import React, {Component} from "react";
import {View, ActivityIndicator, ProgressBarAndroid, Platform} from "react-native";

class LoadingView extends Component {
    static defaultProps = {
        isDismissible: false,
        isVisible: false,
        color: 'white',
        size: 'large',
        overlayColor: 'rgba(0, 0, 0, 0)',
        panelColor: 'rgba(0, 0, 0, 0.8)',
    };


    _renderSpinner() {
        let spinnerStyle = {
            marginTop: 0,
            width: 100,
            height: 100,
            borderRadius: 16,
            backgroundColor: this.props.panelColor
        };

        return (
            <ActivityIndicator
                style={spinnerStyle}
                color={this.props.color}
                size={this.props.size}
            />
        );
    }


    render() {
        if (this.props.isVisible) {
            return (
                <View
                    key="Loading"
                    style={[{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: this.props.overlayColor
                    }]}
                    underlayColor={this.props.overlayColor}
                    activeOpacity={1}
                    {...this.props}>
                    {this._renderSpinner()}
                </View>
            );
        } else {
            return (<View />);
        }
    }
}

export default LoadingView;