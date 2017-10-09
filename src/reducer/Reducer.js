/**
 * Created by laker on 28/09/2017.
 */
import { combineReducers } from 'redux';
import ErrorReducer from "./ErrorReducer"

export default function createReducer(asyncReducers) {
    return combineReducers({

        ...asyncReducers,
        ErrorReducer
    });
}