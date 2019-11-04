import { put } from 'redux-saga/effects'
import { setUserDataAction } from "../actions/setUserDataActions";
import { push } from 'connected-react-router'

function* getAccountsDetailsSaga(action){
    const { walletAddress } = action
    try{
       yield put(setUserDataAction(walletAddress))
       yield put(push('/home'))
    }catch(err){
        console.log(err)
        alert('Error')
    }

}

export default getAccountsDetailsSaga