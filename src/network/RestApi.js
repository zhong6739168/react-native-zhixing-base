/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import NetworkUtils from "../util/NetworkUtils";
import StringUtils from "../util/StringUtils";
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
            if (!StringUtils.isEmpty(tmpArgs)) {
                url = url + (url.indexOf('?') > 0 ? '&' : '?') + queryString.stringify(tmpArgs, config);
            }
        }
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        if (!StringUtils.isEmpty(headersParams)) {
            for (let i = 0; i < headersParams.length; i++) {
                headers.append(headersParams[i].key, headersParams[i].value);
            }
        }
        console.log('request :' + url);
        return fetch(url, {
            headers: headers,
        })
            .then(NetworkUtils.checkStatus)
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


        var formData = undefined;
        if (!StringUtils.isEmpty(headersParams)) {
            for (let i = 0; i < headersParams.length; i++) {
                if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'multipart/form-data') {
                    formData = new FormData();
                    for (var key in body) {
                        if(body[key] instanceof Array){
                            body[key].forEach((item)=>{
                                formData.append(key, item);
                            })
                        }else {
                            formData.append(key, body[key]);
                        }
                    }
                }
                else if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'application/json') {
                    formData = body;
                }
                else if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'application/x-www-form-urlencoded') {
                    formData = [];
                    for (var key in body) {
                        if (Array.isArray(body[key])) {
                            body[key].forEach((item)=> {
                                formData.push({key: item});
                            });
                        } else {
                            formData.push({key: body[key]});
                        }
                    }
                }
                headers.append(headersParams[i].key, headersParams[i].value);

            }
        }
        if (!formData) {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
        }

        return fetch(url, {
            method: 'POST',
            body: formData ? formData : queryString.stringify(body),
            headers: headers,
        })
            .then(NetworkUtils.checkStatus)
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

        var formData = undefined;
        if (!StringUtils.isEmpty(headersParams)) {
            for (let i = 0; i < headersParams.length; i++) {
                if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'multipart/form-data') {
                    formData = new FormData();
                    for (var key in body) {
                        formData.append(key, body[key]);
                    }
                }
                else if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'application/json') {
                    formData = body;
                }
                else if (headersParams[i].key == 'Content-Type' && headersParams[i].value == 'application/x-www-form-urlencoded'){
                    formData = [];
                    for (var key in body) {
                        if(Array.isArray(body[key])){
                            body[key].forEach((item)=>{
                                formData.push({key:item});
                            });
                        }else{
                            formData.push({key:body[key]});
                        }
                    }
                }
                headers.append(headersParams[i].key, headersParams[i].value);

            }
        }
        if (!formData) {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
        }

        return fetch(url, {
            method: 'PUT',
            body: formData ? formData : queryString.stringify(body),
            headers: headers,
        })
            .then(NetworkUtils.checkStatus)
            .then((response) => response.json());
    },

};