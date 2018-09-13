/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import React from "react";
import {Provider} from "react-redux";
import Config from "../Config";

module.exports = {
    pushWithBack: function pushParam(screen, title, props, navigatorButtons, navStyle) {
        return ({
            screen: screen,
            title: title,
            navigatorStyle: Object.assign({}, {
                navBarBackgroundColor: Config.getTitleBarColor(),
                navBarTextColor: 'white',
                navBarButtonColor: 'white',
                tabBarHidden: true,
                navBarNoBorder: true,
                topBarElevationShadowEnabled: false,
                navBarTitleTextCentered: true,
                navBarHeight: 50,
                navBarTextFontSize: 20,
                orientation: 'portrait'
            }, navStyle),
            navigatorButtons: {
                leftButtons: navigatorButtons != undefined && navigatorButtons.leftButtons != undefined ? navigatorButtons.leftButtons : [
                    {
                        icon: require('../../img/back_white_button.png'),
                        id: 'backButton',
                        title: '返回'
                    }
                ],
                rightButtons: navigatorButtons != undefined && navigatorButtons.rightButtons != undefined ? navigatorButtons.rightButtons : []
            },
            passProps: props
        });
    },


    reduxStoreWrapper: function (MyComponent, store) {
        return () => {
            return class StoreWrapper extends React.Component {
                render() {
                    return (
                        <Provider store={store}>
                            <MyComponent {...this.props}/>
                        </Provider>
                    );
                }
            };
        };
    }

};