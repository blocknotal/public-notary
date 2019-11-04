import { arweave } from ".";

const generateUploadDocTx = async(docFile, docName, docHash, wallet) => new Promise(async (resolve, reject) => {
    try{
        const data = JSON.stringify({
            docFile, docName, docHash
        })
        let transaction = await arweave.createTransaction({ data }, wallet)
        await transaction.addTag('App-name', 'block-notal-storage')
        const address = await arweave.wallets.jwkToAddress(wallet)
        const winston =  await arweave.wallets.getBalance(address)
        if(parseInt(winston) < parseInt(transaction.reward)) {
            alert('No Ar Balance available for this transaction')
            reject({ msg: 'No Balance' })
        }
        const fee = await arweave.ar.winstonToAr(transaction.reward)
        resolve({ transaction, fee })
    }catch(e){
        console.log(e)
        reject(e)
    }
})

export default generateUploadDocTx