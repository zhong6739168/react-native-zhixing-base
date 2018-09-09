/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import React from "react";
import {Provider} from "react-redux";

module.exports = {
    pushWithBack: function pushParam(screen, title, props, options) {
        let topBar = Object.assign({}, {
            title: {
                text: title
            },
            rightButtons: [],
            leftButtons: [{
                id: 'backButton',
                icon: require('../../img/back_white_button.png')
            }],
            backButton: {
                visible: false,
            }
        }, options == undefined || options.topBar == undefined ? {} : options.topBar)

        let bottomTabs = Object.assign({}, {
            visible: false,
            drawBehind: true,
        }, options == undefined || options.bottomTabs == undefined ? {} : options.bottomTabs)
        let mergedOptions = Object.assign({}, {
            animate: true,
        }, options, {topBar, bottomTabs})


        return ({
            component: {
                name: screen,
                passProps: props,
                options: mergedOptions,
            }
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