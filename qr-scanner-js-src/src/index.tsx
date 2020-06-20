/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
/// <reference path='../custom.d.ts'/>
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './components/App';
import Properties from "./lib/Properties";

const APP_NAME = 'qrscannerredirect';
const rootElement = document.getElementById(APP_NAME)
Properties.init(APP_NAME);

ReactDOM.render(
    <App />, rootElement
);
