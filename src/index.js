import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import  rootReducer from './reducers';
import { userReducer } from './reducers/userReducer';

import App from './App';

const store = createStore(userReducer);

ReactDOM.render(
    <Router>
        <Provider store={store} >
            <App />
        </Provider>
    </Router>
, document.getElementById('root'));