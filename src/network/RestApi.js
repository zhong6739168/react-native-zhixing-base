/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import ApplicationUtils from "../util/ApplicationUtils";
import React, {Component} from "react";
import queryString from "query-string";

module.exports = {
    GET: function (url, args, headersParams) {
        if (args) {
            var tmpArgs = {};
            for (var key in args) {
                if (url.indexOf('${' + key + '}') >= 0) {
                    url = url.replace('${' + key + '}', args[key]);
                } else {
                    tmpArgs[key] = args[key];
                }
            }
            var config = {};
            if (args.encode != null) {
                config = {encode: args.encode}
            }
            if (!ApplicationUtils.isEmpty(tmpArgs)) {
                url = url + (url.indexOf('?') > 0 ? '&' : '?') + queryString.stringify(tmpArgs, config);
            }
        }
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        if(!ApplicationUtils.isEmpty(headersParams)){
            for (let i = 0; i < headersParams.length; i++) {
                headers.append(headersParams[i].key, headersParams[i].value);
            }
        }
        console.log('request :' + url);
        return fetch(url, {
            headers: headers,
        })
            .then(ApplicationUtils.checkStatus)
            .then((response) => response.json());
    },


    POST: function (url, args, body, headersParams) {
        if (args) {
            for (var key in args) {
                if (url.indexOf('${' + key + '}') >= 0) {
                    url = url.replace('${' + key + '}', args[key]);
                }
            }
        }
        console.log('post :' + url);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if(!ApplicationUtils.isEmpty(headersParams)){
            for (let i = 0; i < headersParams.length; i++) {
                headers.append(headersParams[i].key, headersParams[i].value);
            }
        }
        return fetch(url, {
            method: 'POST',
            body: queryString.stringify(body),
            headers: headers,
        })
            .then(ApplicationUtils.checkStatus)
            .then((response) => response.json());
    },

    PUT: function (url, args, body, headersParams) {
        if (args) {
            for (var key in args) {
                if (url.indexOf('${' + key + '}') >= 0) {
                    url = url.replace('${' + key + '}', args[key]);
                }
            }
        }
        console.log('post :' + url);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        if(!ApplicationUtils.isEmpty(headersParams)){
            for (let i = 0; i < headersParams.length; i++) {
                headers.append(headersParams[i].key, headersParams[i].value);
            }
        }

        return fetch(url, {
            method: 'PUT',
            body: queryString.stringify(body),
            headers: headers,
        })
            .then(ApplicationUtils.checkStatus)
            .then((response) => response.json());
    },

    UPLOAD: function (url, args, body, headersParams) {
        if (args) {
            for (var key in args) {
                if (url.indexOf('${' + key + '}') >= 0) {
                    url = url.replace('${' + key + '}', args[key]);
                }
            }
        }
        console.log('post :' + url);
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        //headers.append('Content-Type', 'multipart/form-data');
        if(!ApplicationUtils.isEmpty(headersParams)){
            for (let i = 0; i < headersParams.length; i++) {
                headers.append(headersParams[i].key, headersParams[i].value);
            }
        }
        return fetch(url, {
            method: 'POST',
            body: body,
            headers: headers,
        }).then(ApplicationUtils.checkStatus)
            .then((response) => response.json());
    },
};