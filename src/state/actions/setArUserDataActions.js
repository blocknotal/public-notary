const fetchArUserDataSaga = (arWalletFile) => ({
    type:'ROOT_FETCH_AR_USERDATA',
    arWalletFile
})

const loadingArUserDataAction = () => ({
    type: 'LOADING_AR_USER_DATA_ACTION',
    account: false,
    loadingArUserData: true
})

const setArUserDataAction = (account) => ({
    type: 'SET_AR_USER_DATA_ACTION',
    account,
    loadingArUserData: false
}) 

const cleanArUserDataAction = () => ({
    type: 'CLEAN_AR_USER_DATA_ACTION',
    account: false,
    loadingArUserData: false
})

const setArStorageListAction = fileList => ({
    type:'SET_AR_STORAGE_LIST_ACTION',
    fileList
})

export {
    fetchArUserDataSaga,
    setArUserDataAction,
    loadingArUserDataAction,
    cleanArUserDataAction,
    setArStorageListAction
}