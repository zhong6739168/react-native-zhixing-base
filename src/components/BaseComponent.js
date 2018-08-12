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
        Navigation.events().bindComponent(this);
    }


    navigationButtonPressed({ buttonId }) {
        if(buttonId == 'backButton' || buttonId == 'backPress'){
            Navigation.pop(this.props.componentId);
        }
    }



}


module.exports = BaseComponent;