import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import UserData from './setUserDataReduce'
import ArUserData from './setArUserDataReduce'
import ArStorageList from './setArStorageList'

export default history =>
  combineReducers({
    router: connectRouter(history),
    UserData,
    ArUserData,
    ArStorageList
  })
