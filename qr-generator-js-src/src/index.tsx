/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
/// <reference path='../custom.d.ts'/>
import * as React    from "react";
import * as ReactDOM from "react-dom";
import App           from './components/App';


setTimeout(()=>{
  const APP_NAME    = 'qrgenerator';
  const rootElement = document.getElementById(APP_NAME)
  
  // create only the component if the element was found in the document
  if(rootElement!=null){    
    ReactDOM.render(
        <App url={rootElement.getAttribute('data-url')} />, rootElement
    );
  }

}, 1000)
