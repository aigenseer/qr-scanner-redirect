import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const APP_NAME    = 'qrgenerator';

function loadElements(){
    const rootElements = document.getElementsByClassName(APP_NAME);
    [...rootElements as any].forEach((rootElement: Element) => {
        if(rootElement!=null){
            ReactDOM.render(
                <React.StrictMode>
                    <App url={rootElement.getAttribute('data-url')} size={rootElement.getAttribute('data-size')} jsonOptions={rootElement.getAttribute('data-json-options')} />
                </React.StrictMode>, rootElement
            );
        }
    });
}

setTimeout(() => loadElements(), 500);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
