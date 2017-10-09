/**
 * Created by zhongxiangyong on 2017/01/01.
 */
module.exports = {
    isEmpty: function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    },

    /**
     * 判断是否null
     * @param data
     */
    isNull(data){
        if (data == undefined || data == null || data == "") {
            return true;
        }
        return false;
    },

    formatRetainDate: function (date) {
        return date.split(" ")[0];
    },

    getFunctionStyle: function (style) {
        return [{
            height: 150,
            backgroundColor: "#04B0F0",
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }, style]
    },

    encodeUTF8: function (str) {
        var temp = "", rs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            temp = str.charCodeAt(i).toString(16);
            rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        }
        return rs;
    },

    decodeUTF8: function (str) {
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
            return String.fromCharCode(parseInt($2, 16));
        });
    },

    checkStatus: function (response) {
        // https://github.com/github/fetch
        if (response.status >= 200 && response.status < 300) {
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


}