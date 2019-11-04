import getEthWeb3 from "./getEthWeb3";

const signTypedData = async (data) => new Promise(async (resolve, reject) => {
    try {
      const dataString = await JSON.stringify(data)
      console.log(dataString)
      const { web3, address } = await getEthWeb3()
      web3.currentProvider.sendAsync({
        method: 'eth_signTypedData_v3',
        params: [address, dataString],
        from: address
      },
      async (error, res) => {
        if (error || !res.result) {
          reject({ err: 'Denied Sign', error })
        } else {
          console.log(res.result)
          resolve(res.result)
        }
      })
    } catch (err) {
      reject(err)
    }
})


export default signTypedData
  