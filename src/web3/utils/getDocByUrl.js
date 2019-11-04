import { arweave } from ".."

const getDocByUrl = async (transactionHash) => {
    const transaction = await arweave.transactions.get(transactionHash)
    const response = await transaction.get('data', { decode: true, string: true })
    const { docFile } = JSON.parse(response)
    return docFile
}

export default getDocByUrl