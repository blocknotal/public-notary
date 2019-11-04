import { readArweaveAccount } from "../utils/readDataUtils"
import { arweave } from "./index"

const getArweaveAccount = async (fileUploadEvent) => {
    try{
        const accountRaw = await readArweaveAccount(fileUploadEvent)
        const account = JSON.parse(accountRaw)
        const address = await arweave.wallets.jwkToAddress(account)
        const winston =  await arweave.wallets.getBalance(address)
        const ar = await arweave.ar.winstonToAr(winston)
        return {
            account, address, balance: { winston, ar }
        }
    }catch(e){
        console.log(e)
        return null
    }
}

export default getArweaveAccount