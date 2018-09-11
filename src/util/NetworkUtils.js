/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import Toast from "react-native-root-toast";

module.exports = {
    checkStatus: function (response) {
        // https://github.com/github/fetch
        if (response.status >= 200 && response.status < 500) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },

    formatData: function (response) {
        return response.json();
    },

    normalReducer: function (action, state, mapper) {
        if (action.payload.status == 0) {
            action.callback && action.callback(action.payload.data);
            return Object.assign({}, state, mapper(action));
        } else if (action.payload.status == 2) {
            throw Error('您的登录令牌已失效，请重新登录账号');
        }else {
            Toast.show(action.payload.message == null ? "当前网络不可用请稍后再试！" : action.payload.message);
            action.errorCallback && action.errorCallback();
        }
        return state;
    }


}