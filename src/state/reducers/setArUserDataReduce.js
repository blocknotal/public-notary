export default function setUserDataReduce(state = {}, action) {
    const { account, loadingArUserData, listFile } = action
    switch (action.type) {
        case 'SET_AR_USER_DATA_ACTION':
            return Object.assign({}, state,
            {
                account, loadingArUserData, listFile
            })
        case 'LOADING_AR_USER_DATA_ACTION':
            return Object.assign({}, state,
            {
                account, loadingArUserData, listFile
            })
        case 'CLEAN_AR_USER_DATA_ACTION':
            return Object.assign({}, state,
            {
                account, loadingArUserData, listFile
            })
        default: return state
    }
}