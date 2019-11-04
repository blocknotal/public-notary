import React from 'react'
import UploadArweaveAccount from './components/UploadArweaveAccount';
import LoadingModal from '../../utils/LoadingModal';
import { Grid, Typography, Button } from '@material-ui/core'
import { getPdfFileData } from '../../utils/readDataUtils';
import generateUploadDocTx from '../../web3/generateUploadDocTx';
import ConfirmTransactionModal from './components/ConfirmTransactionModal';
import { arweave } from '../../web3';
import ListDoc from './components/ListDoc';
import ViewDoc from './components/ViewDoc';


class StorageIndex extends React.Component{
    state = {
        uploadDocTransaction: false,
        uploadDocFee: false,
        docName: false,
        docHash: false,
        loadingModal: false,
        viewDocModal: false,

    }

    loadArAccount = async (event) => {
        const { fetchArUserDataSaga } = this.props
        try{
            fetchArUserDataSaga(event.target.files[0])
        }catch(e){
            console.log(e)
        }
    }

    uploadDoc = async (event) => {
        const { account } = this.props.arUserData.account
        const file = event.target.files[0]
        try{
            this.setState({ loadingModal: true })
            const { docFile, docName, docHash } = await getPdfFileData(file)
            const { transaction, fee } = await generateUploadDocTx(docFile, docName, docHash, account)
            this.setState({ uploadDocTransaction: transaction, uploadDocFee: fee, docName, docHash, loadingModal: false })
        }catch(e){
            console.log(e)
            this.clearState()
        }
    }

    confirmUpload = async() => {
        const { uploadDocTransaction } = this.state
        const { account } = this.props.arUserData.account
        try{
            this.setState({ loadingModal: true })
            var transaction = uploadDocTransaction
            await arweave.transactions.sign(transaction, account)
            const response = await arweave.transactions.post(transaction)
            this.clearState()
            alert('Transaction Deploy, wait the confirmation for view your file')
        }catch(err){
            alert('Transaction Failed')
            this.setState({ loadingModal: false })
            console.log(err)
        }
    }

    openDoc = (docFileUrl) => this.setState({ viewDocFile: docFileUrl , viewDocModal: true })

    clearState = () => this.setState({ uploadDocTransaction: false, uploadDocFee: false, docName: false, loadingModal: false })

    closeViewDoc = () => this.setState({ viewDocModal: false, viewDocFile: false })

    render(){
        const { arUserData, arStorageList } = this.props
        const { uploadDocFee, docName, loadingModal, viewDocFile, viewDocModal, docHash } = this.state
            return(
                <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
                    <Typography variant="h6" align="center">Storage Index</Typography>
                    {arUserData.account ?  
                    <Grid container direction="column">
                    <Typography align="center">{arUserData.account.address}</Typography>
                    <Typography align="center">{arUserData.account.balance.ar} AR</Typography>
                    <Button onClick={() => this.refs.docInput.click()}>Upload Document</Button>
                    <input ref="docInput" type="file" accept="application/pdf" onChange={ event => this.uploadDoc(event)} style={{ display: 'none' }} />
                    <ListDoc files={arStorageList.fileList} openDoc={this.openDoc} />
                    <ViewDoc open={viewDocModal} docFile={viewDocFile} closeViewDoc={this.closeViewDoc} />
                    </Grid>
                    :
                    <UploadArweaveAccount loadArAccount={this.loadArAccount} />
                    }
                    <LoadingModal open={arUserData.loadingArUserData || loadingModal} />
                    <ConfirmTransactionModal confirmUpload={this.confirmUpload} transactionFee={uploadDocFee} docName={docName} docHash={docHash} />
                </Grid>
            )     
    }
}


export default StorageIndex