import { put, call } from 'redux-saga/effects'
import getArweaveAccount from '../../web3/getArweaveAccount';
import getArStorageFiles from '../../web3/getArStorageFiles';
import { loadingArUserDataAction, setArUserDataAction, setArStorageListAction, cleanArUserDataAction } from '../actions/setArUserDataActions';

function* setArUserDataSaga(action){
    const { arWalletFile } = action
    try{
       yield put(loadingArUserDataAction())
       const account = yield call(getArweaveAccount, arWalletFile)
       const listFiles = yield call(getArStorageFiles, account.address)
       //console.log(account, listFiles)
       yield put(setArStorageListAction(listFiles))
       yield put(setArUserDataAction(account))
    }catch(err){
        yield put(cleanArUserDataAction())
        console.log(err)
        alert('Error on Load Ar Wallet')
    }
}

export default setArUserDataSaga