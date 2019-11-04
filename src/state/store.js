import { createStore, applyMiddleware}  from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import history from './../routes/history'
import reducers from './reducers/index'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()


const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)  
]

const store = createStore(
    reducers(history),
    applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga)

export default store