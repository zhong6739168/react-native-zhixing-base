/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import {Navigation} from "react-native-navigation";
import {Config} from "../Config";
module.exports = {
    pushWithBack: function pushParam(screen, title, props, rightButtons, navStyle) {
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
            }, navStyle),
            navigatorButtons: {
                leftButtons: [
                    {
                        icon: require('../../img/back_white_button.png'),
                        id: 'backButton',
                        title: '返回'
                    }
                ],
                rightButtons: rightButtons
            },
            passProps: props
        });
    }

};