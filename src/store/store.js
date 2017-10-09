/**
 * Created by zhongxiangyong on 2017/01/01.
 */
import {applyMiddleware, createStore, compose} from "redux";
import {persistStore, autoRehydrate} from "redux-persist";
import createSagaMiddleware from "redux-saga";
import createReducer from "../reducer/Reducer";
import {AsyncStorage} from "react-native";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    createReducer(), compose(
        applyMiddleware(sagaMiddleware),
        autoRehydrate()
    )
);
store.asyncReducers = {};


export function initStore(storageParam) {
    persistStore(store, storageParam ? storageParam : {storage: AsyncStorage, blacklist: []});
}

export function registerSaga(sagaComponent) {
    sagaMiddleware.run(sagaComponent)
}


export function injectAsyncReducer(name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}


export default store;