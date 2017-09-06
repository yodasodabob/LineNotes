import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom'
import 'babel-polyfill'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('root'));
registerServiceWorker();
