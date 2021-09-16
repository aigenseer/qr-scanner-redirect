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
  const rootElements = document.getElementsByClassName(APP_NAME);

  [...rootElements as any].forEach((rootElement: Element) => {
    if(rootElement!=null){
      ReactDOM.render(
          <App url={rootElement.getAttribute('data-url')} size={rootElement.getAttribute('data-size')} />, rootElement
      );
    }
  });


}, 1000)
