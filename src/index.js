import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import NotificationContextProvider from './contexts/notificationContext';
import AuthContextProvider from './contexts/AuthContext';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import  thunk from 'redux-thunk'
import centralReducer from './reducers/index'

const appStore = createStore(centralReducer, applyMiddleware(thunk))

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
