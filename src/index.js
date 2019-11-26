import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import NotificationContextProvider from './contexts/notificationContext';
import AuthContextProvider from './contexts/AuthContext';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import  thunk from 'redux-thunk'
import centralReducer from './reducers/index'

const composeEnhancers = 
    process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : null || compose

const appStore = createStore(centralReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={appStore}>
        <BrowserRouter>
            <NotificationContextProvider>
                <AuthContextProvider>
                    <App/>
                </AuthContextProvider>
            </NotificationContextProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
