import { takeLatest, all } from 'redux-saga/effects'
import setUserData from './setUserDataSaga'
import setArUserDataSaga from './setArUserDataSaga'

export default function* watchAll() {
    yield all([
        takeLatest('ROOT_FETCH_USERDATA', setUserData),
        takeLatest('ROOT_FETCH_AR_USERDATA', setArUserDataSaga)
    ])
}