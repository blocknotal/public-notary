import { arweave } from ".";

const getArStorageFiles = async(arweaveAddres) => new Promise(async (resolve, reject) => {
    try{
        const query = {
            op: 'and',
            expr1: {
                op: 'equals',
                expr1: 'from',
                expr2: arweaveAddres
            },
            expr2: {
                op: 'equals',
                expr1: 'App-name',
                expr2: 'block-notal-storage'
            }    
        }
        const hashList = await arweave.arql(query)
        const result = await getTransactionListData(hashList)
        resolve(result)
    }catch(e){
        console.log(e)
        reject(e)
    }
})

export default getArStorageFiles



const getTransactionListData = async(listTransationId) => new Promise(async(resolve, reject) => {
    try{
        let promiseList = []
        listTransationId.map(txHash => promiseList.push(getTransactionData(txHash)))
        const result = await Promise.all(promiseList)
        resolve(result)
    }catch(e){
        console.log(e)
        reject(e)
    }
})

const getTransactionData = async (transactionHash) => {
    const transaction = await arweave.transactions.get(transactionHash)
    const response = await transaction.get('data', { decode: true, string: true })
    let data = JSON.parse(response)
    data.transactionHash = transactionHash
    console.log(data)
    return data
}
