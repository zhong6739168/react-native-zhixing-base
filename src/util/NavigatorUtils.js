/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import React from "react";
import {Provider} from "react-redux";

module.exports = {
    pushWithBack: function pushParam(screen, title, props, rightButtons, navStyle) {
        return ({
            component: {
                name: screen,
                passProps: props,
                options: {
                    topBar: {
                        title: {
                            text: title
                        },
                        rightButtons: rightButtons == null ? [] : rightButtons,
                        leftButtons: [{
                            id: 'backButton',
                            icon:require('../../img/back_white_button.png')
                        }],
                        backButton:{
                            visible:false,
                        },
                        noBorder: true,
                        height: 50,
                    },
                    bottomTabs: {
                        visible: false,
                        drawBehind:true,
                    },
                    animate: true,
                }
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