import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './state/store'
import Routes from './routes/MainRoutes'
import index from './index.css'

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
)

