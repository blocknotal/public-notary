const fetchUserDataSaga = (walletAddress) => ({
    type: 'ROOT_FETCH_USERDATA',
    walletAddress
})

const setUserDataAction = (walletAddress) => ({
    type: 'SET_USER_DATA_ACTION',
    walletAddress
})


export {
    fetchUserDataSaga,
    setUserDataAction
}