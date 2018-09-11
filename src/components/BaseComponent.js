/**
 * Created by laker on 29/10/2016.
 */
'use strict';

import React, {Component} from "react";
import { Navigation } from 'react-native-navigation';

class BaseComponent extends Component {


    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if ((event.id == 'backButton') || (event.id == 'backPress')) { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.pop();
            }
        }
    }



}


module.exports = BaseComponent;