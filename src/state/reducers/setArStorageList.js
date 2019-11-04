export default function setArStorageList(state = {}, action) {
    const { fileList } = action
    switch (action.type) {
        case 'SET_AR_STORAGE_LIST_ACTION':
        return Object.assign({}, state,
          {
            fileList
          })
        default: return state
    }
}