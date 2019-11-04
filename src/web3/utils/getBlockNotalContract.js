import getEthWeb3 from "./getEthWeb3";
import BlockNotalABI from "../contracts/PublicAgreeABI.json"

const getBlockNotalContract = () => new Promise(async (resolve, reject) => {
    try{
        const { web3 } = await getEthWeb3();
        const contract = new web3.eth.Contract(BlockNotalABI, "0x318572Ae41771f49Ac36A7e11c9DCEAd9260d580")
        resolve(contract)
    }catch(e){
        reject(e)
    }
})

export default getBlockNotalContract