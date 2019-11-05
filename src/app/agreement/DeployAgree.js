import React from 'react'
import getBlockNotalContract from "../../web3/utils/getBlockNotalContract";
import { Grid } from '@material-ui/core'
import BoxAgree from './components/BoxAgree';
import getTypedDataSign from '../../web3/utils/getTypedDataSign';
import signTypedData from '../../web3/utils/signTypedData';
import getDocByUrl from '../../web3/utils/getDocByUrl';
import LoadingModal from '../../utils/LoadingModal';
import { Redirect } from 'react-router-dom'
import downloadFile from '../../utils/downloadDocument';

class DeployAgree extends React.Component{
    state = {
        loading: true,
        error: false,
        contractsDeploy: [],
        loadingFileView: false,
        docViewData: false,
        viewDocModal: false
    }

    componentDidMount = async() => {
        const { walletAddress } = this.props.userData
        try{
            const blockNotalContract = await getBlockNotalContract()
            const contractsDeployList = await blockNotalContract.methods.getDeployAgrees(walletAddress).call()
            console.log(contractsDeployList)
            const contractsDeploy = await contractsDeployList.filter(e =>  e[1].length !== 0)
            this.setState({ contractsDeploy , loading: false })
        }catch(e){
            this.setState({ loading: false, error: true })
        }
    }

    signDoc = async(agreeId, agreeData) => {
        const { walletAddress } = this.props.userData
        const { arDataUrl, dataSha256 } = agreeData
        try{
            const dataForSign = await getTypedDataSign(arDataUrl, dataSha256)
            const signature = await signTypedData(dataForSign)
            const sigEdit = signature.substring(2)
            const r = "0x" + sigEdit.substring(0, 64)
            const s = "0x" + sigEdit.substring(64, 128)
            const v = parseInt(sigEdit.substring(128, 130), 16)
            const blockNotalContract = await getBlockNotalContract()
            await blockNotalContract.methods.signAgree(agreeId,v,r,s,walletAddress).send({ from: walletAddress },
                (err, transactionId) =>{
                    if(err || !transactionId){
                        alert('Error')
                        return console.log(err)
                    }else{
                        const signDeployData = {
                            signature, agreeId, txHashDeploy: transactionId
                        }
                        this.setState({ signDeployData })
                    }
            })
        }catch(err){
            alert('Error')
            console.log(err)
        }
    }

    viewDoc = async(dataUrl) => {
        try{
            this.setState({ loadingFileView: true })
            const docData = await getDocByUrl(dataUrl)
            this.setState({ loadingFileView: false  })
            downloadFile(docData)
        }catch(err){
            console.log(err)
            this.setState({ loadingFileView: false })
        }
    }

    closeViewDoc = () => this.setState({ docViewData: false, viewDocModal: false })

    render(){
        const { loading, error, contractsDeploy, loadingFileView, viewDocModal, docViewData, signDeployData } = this.state
        const { walletAddress } = this.props.userData
        if(!walletAddress){
            return(
                <Redirect to="/" />
            )
        }
        if(loading){
            return(
                <p align="center" style={{ margin: 20 }}>Loading...</p>
            )
        }
        if(error){
            return(
                <p align="center" style={{ margin: 20 }}>Failed to fetch agreements.</p>
            )
        }
        if(contractsDeploy.length === 0 || !contractsDeploy){
            return(
                <p align="center" style={{ margin: 20 }}>No agreements to show.</p>
            )
        }
        if(signDeployData){
            return(
                <Redirect to={{
                    pathname: '/home/confirmsign',
                    state: { signDeployData }
                }}
        />
            )
        }
        return(
            <Grid container justify="center" direction="row" alignContent="center" alignItems="center">
                {contractsDeploy.map((contract, index) => <BoxAgree contract={contract} hiddeOwner={true} signDoc={this.signDoc} viewDoc={this.viewDoc} userAddress={walletAddress}/>)}
                <LoadingModal open={loadingFileView} />
            </Grid>
        )
    }
}

export default DeployAgree