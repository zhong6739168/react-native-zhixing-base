/**
 * Created by laker on 28/09/2017.
 */
import store, {initStore, injectAsyncReducer, registerSaga} from "./src/store/store";
import {mapToResponseAction} from "./src/actions/actions";
import LoadingView from "./src/views/LoadingView";
import WebView from "./src/views/WebViewComponent";
import BaseComponent from "./src/components/BaseComponent";
import NetworkUtils from "./src/util/NetworkUtils";
import NavigatorUtils from "./src/util/NavigatorUtils";
import {Navigation} from "react-native-navigation";
import Config from "./src/Config";
import StringUtils from "./src/util/StringUtils";

Navigation.registerComponent('base.WebView', () => WebView);


export * from './src/network/FetchApi';


export default store;

export {
    initStore,
    injectAsyncReducer,
    registerSaga,
    mapToResponseAction,
    LoadingView,
    BaseComponent,
    NetworkUtils,
    NavigatorUtils,
    Config,
    StringUtils,

}