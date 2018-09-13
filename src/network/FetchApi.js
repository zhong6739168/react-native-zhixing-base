/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import {call, put, race} from "redux-saga/effects";
import RestApi from "../network/RestApi";
import {delay} from "redux-saga";
import actions, {mapToResponseAction} from "../actions/actions";

const time = 15000;

export function* fetchByAction(url, action, responseParser, timeout) {
    try {
        const {response} = yield race({
            response: call(RestApi.GET, url, action.payload, action.headers),
            timeout: call(delay, timeout == undefined ? time : timeout)
        });
        yield handleResponse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}


export function* postByAction(url, action, responseParser, timeout) {
    try {
        const {response} = yield race({
            response: call(RestApi.POST, url, action.payload.urlParam, action.payload.bodyParam, action.headers),
            timeout: call(delay, timeout == undefined ? time : timeout)
        });
        yield handleResponse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}

export function* putByAction(url, action, responseParser, timeout) {
    try {
        const {response} = yield race({
            response: call(RestApi.PUT, url, action.payload.urlParam, action.payload.bodyParam, action.headers),
            timeout: call(delay, timeout == undefined ? time : timeout)
        });
        yield handleResponse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}


function *handleResponse(response, responseParser, action, url) {
    if (response != null) {
        console.log("response : " + JSON.stringify(response));
        if (response.status == 2) {
            yield put({
                type: "tokenInvalid",
                message: "您的登录令牌已失效，请重新登录账号",
            });
        } else {
            yield put({
                type: mapToResponseAction(action.type),
                payload: responseParser(response),
                callback: action.callback,
                from: action.type,
                requestParam: action.payload,
                requestUrl: url,
                otherParam: action.otherParam,
                errorCallback: action.errorCallback,
            });
        }
    }
    else {
        throw new Error('请求超时，请稍后再试。');
    }
}


function *handleError(e, action, url) {
    yield put({
        type: actions.FETCH_ERROR,
        message: e.message ? e.message : '网络异常,请稍后再试!',
        from: action.type,
        requestParam: action.payload,
        otherParam: action.otherParam,
        requestUrl: url,
        errorCallback: action.errorCallback,
    });
}