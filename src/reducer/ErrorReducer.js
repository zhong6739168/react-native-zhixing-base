/**
 * Created by laker on 14/11/2016.
 */
import actions from "../actions/actions";
import Toast from "react-native-root-toast";
const initialState = {};


export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_ERROR:
            console.log('request error', action);
            action.errorCallback && action.errorCallback();
            Toast.show("无法访问服务器，请检查您的网络");
        default:
            return state;
    }
};