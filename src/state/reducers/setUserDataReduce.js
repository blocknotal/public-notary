export default function setUserDataReduce(state = {}, action) {
    const { walletAddress } = action
    switch (action.type) {
        case 'SET_USER_DATA_ACTION':
        return Object.assign({}, state,
          {
            walletAddress
          })
        default: return state
    }
}