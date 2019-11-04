import Web3 from 'web3'


const getEthWeb3 = () => {
    return new Promise(async (resolve, reject) => {  
        let accounts
        if(!window.ethereum && !window.web3){
            reject()
        } 
        if (window.ethereum) {
            const web3  = new Web3(window.ethereum);
            try{
              await window.ethereum.enable()
              accounts = await web3.eth.getAccounts()
              resolve({web3, address: accounts[0] })
            } catch(err){
              reject(err)
            }          
        }
        if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
            accounts = await web3.eth.getAccounts()
            resolve({web3, address: accounts[0] })
        }
        reject()
})}

export default getEthWeb3