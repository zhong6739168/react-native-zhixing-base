/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import {call, put, race} from "redux-saga/effects";
import RestApi from "../network/RestApi";
import {delay} from "redux-saga";
import actions, {mapToResponseAction} from "../actions/actions";

const time = 15000;

export function* fetchByAction(url, action, responseParser) {
    try {
        const {response} = yield race({
            response: call(RestApi.GET, url, action.payload, action.headers),
            timeout: call(delay, time)
        });
        yield handleResonse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}


export function* postByAction(url, action, responseParser) {
    try {
        const {response} = yield race({
            response: call(RestApi.POST, url, action.payload.urlParam, action.payload.bodyParam, action.headers),
            timeout: call(delay, time)
        });
        yield handleResonse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}

export function* putByAction(url, action, responseParser) {
    try {
        const {response} = yield race({
            response: call(RestApi.PUT, url, action.payload.urlParam, action.payload.bodyParam, action.headers),
            timeout: call(delay, time)
        });
        yield handleResonse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}

export function* uploadByAction(url, fileUrl, action, responseParser) {
    let formData = new FormData();
    if (action.payload.files) {
        for (var i = 0; i < action.payload.files.length; i++) {
            let file = {uri: action.payload.files[i].fileUrl, type: 'image/png', name: 'image.png'};
            formData.append(action.payload.files[i].key, file);
        }
    }
    try {
        const {response} = yield race({
            response: call(RestApi.UPLOAD, url, action.payload.urlParam, formData, action.headers),
            timeout: call(delay, time)
        });
        yield handleResonse(response, responseParser, action, url);
    } catch (e) {
        yield handleError(e, action, url);
    }
}

function *handleResonse(response, responseParser, action, url) {
    console.log("response : " + response);
    if (response != null) {
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