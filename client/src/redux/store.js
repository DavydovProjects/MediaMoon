import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import api from './middlewares/api'
import logger from './middlewares/logger'
// import logger from 'redux-logger'

const middleware = applyMiddleware(api, thunk)

const store = createStore(reducer, {}, middleware)
export default store
