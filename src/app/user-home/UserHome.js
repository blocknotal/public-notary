import React from 'react'
import { Grid, Avatar, Button, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import makeBlockie from 'ethereum-blockies-base64'
import { Link } from 'react-router-dom'
import getBlockNotalContract from '../../web3/utils/getBlockNotalContract';
import BoxAgree from '../agreement/components/BoxAgree';
import getDocByUrl from '../../web3/utils/getDocByUrl';
import getTypedDataSign from '../../web3/utils/getTypedDataSign';
import signTypedData from '../../web3/utils/signTypedData';
import ViewDoc from '../storage/components/ViewDoc';
import LoadingModal from '../../utils/LoadingModal';

class UserHome extends React.Component{
    state = {
        loadingPendingSign:true,
        contractsPendingSign: [],
        docViewData: false,
        viewDocModal: false,
        loadingFileView: false
    }


    componentDidMount = async() => {
        const { walletAddress } = this.props.userData
        try{
            const blockNotalContract = await getBlockNotalContract()
            const contractsPendingSignList = await blockNotalContract.methods.getUserPendingAgreeFullData(walletAddress).call()
            console.log(contractsPendingSignList)
            const contractsPendingSign = await contractsPendingSignList.filter(e =>  e[1].length !== 0)
            this.setState({ loadingPendingSign: false, contractsPendingSign })
        }catch(err){
            console.log(err)
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
                        console.log(transactionId)
                    }
            })
        }catch(err){
            console.log(err)
        }
    }

    viewDoc = async(dataUrl) => {
        try{
            this.setState({ loadingFileView: true })
            const docData = await getDocByUrl(dataUrl)
            this.setState({ docViewData: docData, viewDocModal: true, loadingFileView: false  })
        }catch(err){
            console.log(err)
            this.setState({ loadingFileView: false })
        }
    }

    closeViewDoc = () => this.setState({ docViewData: false, viewDocModal: false })


    render(){
        const { walletAddress } = this.props.userData
        const { contractsPendingSign, docViewData, viewDocModal, loadingFileView } = this.state
        return(
            <Grid container style={{ }} justify="center" alignContent="center" alignItems="center" direction="column">
                        <Avatar src={makeBlockie(walletAddress)} style={{margin:10}} />
                        <p>{walletAddress}</p>
                    <Grid continer direction="row">
                        <Link to={'/home/newagree'}>
                            <Button variant="contained" color="primary">New Agreement </Button>
                        </Link>
                    </Grid>
                    <Grid container justify="center" alignContent="center" alignItems="center" style={{marginTop: 10}}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<div class="arrow-down icon"></div>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                 <Typography variant="h6">Request Signature</Typography>
                            </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                                        {contractsPendingSign.map((contract) => <BoxAgree contract={contract} signDoc={this.signDoc} viewDoc={this.viewDoc} userAddress={walletAddress}/>)}
                                    </Grid>
                                </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ViewDoc open={viewDocModal} docFile={docViewData} closeViewDoc={this.closeViewDoc} />
                        <LoadingModal open={loadingFileView} />
                    </Grid>
            </Grid>
        )
    }
}

export default UserHome