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

class ForSignAgree extends React.Component{
    state = {
        loading: true,
        error: false,
        contractsForSign: [],
        loadingFileView: false,
        docViewData: false,
        viewDocModal: false,
        signDeployData: false
    }

    componentDidMount = async() => {
        const { walletAddress } = this.props.userData
        try{
            const blockNotalContract = await getBlockNotalContract()
            const contractsForSign = await blockNotalContract.methods.getUserAgreeFullData(walletAddress).call()
            this.setState({ contractsForSign , loading: false })
        }catch(e){
            console.log(e)
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
                        return console.log(err)
                    }else{
                        const signDeployData = {
                            signature, agreeId, txHashDeploy: transactionId
                        }
                        this.setState({ signDeployData })
                    }
            })
        }catch(e){
            console.log(e)
        }
    }

    viewDoc = async(dataUrl) => {
        try{
            this.setState({ loadingFileView: true })
            const docData = await getDocByUrl(dataUrl)
            this.setState({ loadingFileView: false  })
            downloadFile(docData)
        }catch(e){
            console.log(e)
            this.setState({ loadingFileView: false })
        }
    }

    closeViewDoc = () => this.setState({ docViewData: false, viewDocModal: false })

    render(){
        const { loading, error, contractsForSign, loadingFileView, viewDocModal, docViewData, signDeployData } = this.state
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
        if(contractsForSign.length === 0 || !contractsForSign){
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
                {contractsForSign.map((contract, index) => <BoxAgree contract={contract} signDoc={this.signDoc} viewDoc={this.viewDoc} userAddress={walletAddress}/>)}
                <LoadingModal open={loadingFileView} />
            </Grid>
        )
    }
}

export default ForSignAgree