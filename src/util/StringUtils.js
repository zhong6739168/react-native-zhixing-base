/**
 * Created by laker on 2018/8/13.
 */
module.exports = {

    bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024;
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
    },

    // 检验身份证号码
    isErrorCardID(id) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return !reg.test(id);
    },

    getFileTypeForName(name){
        if (this.endsWith(name, ".png") || this.endsWith(name, ".jpg") || this.endsWith(name, ".jpeg")
            || this.endsWith(name, ".PNG") || this.endsWith(name, ".JPG") || this.endsWith(name, ".JPEG")) {
            return "Image";
        } else if (this.endsWith(name, ".mp4") || this.endsWith(name, ".mkv") || this.endsWith(name, ".rmvb")
            || this.endsWith(name, ".flv") || this.endsWith(name, ".avi") || this.endsWith(name, ".mpg")) {
            return "Video";
        } else {
            return "Other";
        }
    },

    endsWith(str, searchStr, pos) {
        var position = pos == undefined ? 0 : pos;
        // This works much better than >= because
        // it compensates for NaN:
        if (!(position < str.length))
            position = str.length;
        else
            position |= 0; // round position
        return str.toLowerCase().substr(position - searchStr.length,
                searchStr.length) === searchStr;
    },

    checkMobile(phoneNumber){
        if (/^1[3|4|5|7|8][0-9]{9}$/.test(phoneNumber)) {
            return true;
        }
        return false;
    },

    checkEmail(email){
        if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
            return true;
        }
        return false;
    },

    checkID(ID){
        if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(ID)) {
            return true;
        }
        return false;
    },

}