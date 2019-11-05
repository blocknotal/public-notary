import React from 'react'
import { Grid, Typography, Button, TextField, Dialog } from '@material-ui/core'
import Web3 from 'web3'
import ListSigners from './components/ListSigners';
import SelectDocument from './components/SelectDocument';
import ViewDoc from '../storage/components/ViewDoc';
import getBlockNotalContract from '../../web3/utils/getBlockNotalContract';
import { Redirect } from 'react-router-dom'

class NewAgreement extends React.Component {
    state = {
        textAddressTemp: '',
        listSigners: [],
        documentData: false,
        openSelect: false,
        viewDocFile: false,
        tempViewData: false
    }

    addNewSigner = () => {
        if(!Web3.utils.isAddress(this.state.textAddressTemp)){
            alert('Not a Valid Ethereum Address')
            return
        }
        this.setState(state => {
              const listSigners = [...state.listSigners, state.textAddressTemp];
              return { listSigners, textAddressTemp: '' }
        })
    }

    removeSigner = i => {
        this.setState(state => {
          const listSigners = state.listSigners.filter((item, j) => i !== j);
          return { listSigners }
        })
    }

    loadArAccount = async (event) => {
        const { fetchArUserDataSaga } = this.props
        try{
            fetchArUserDataSaga(event.target.files[0])
        }catch(e){
            console.log(e)
        }
    }

    deployContract = async() => {
        const { listSigners, documentData } = this.state
        if(!documentData){
            alert('Select a document')
            return
        }
        if(!listSigners || listSigners.length === 0){
            alert('Put signataries')
            return
        }
        const { walletAddress } = this.props.userData
        const { transactionHash, docHash } = documentData
        const agreeData = {
            arDataUrl: transactionHash,
            dataSha256: docHash
        }
        try{
            const blockNotalContract = await getBlockNotalContract()
            blockNotalContract.methods.newPublicAgree(listSigners, agreeData).send({ from: walletAddress },
                (err, transactionId) =>{
                    if(err || !transactionId){
                        return console.log(err)
                    }else{
                        this.setState({ txHashDeploy: transactionId, deployContract: true })
                    }
            })
        }catch(err){
            console.log(err)
        }
    }

    closeSelectDocModal = () => this.setState({ openSelect: false })
    
    selectDoc = (documentData) => this.setState({ documentData, openSelect: false })

    closeViewDoc = () => this.setState({ viewDocModal: false, tempViewData: false })

    openDoc = (docFileUrl) => this.setState({ tempViewData: docFileUrl , viewDocModal: true })


    render(){
        const { textAddressTemp, listSigners, openSelect, documentData, viewDocModal, deployContract, txHashDeploy, tempViewData } = this.state
        const { arUserData, arStorageList } = this.props
        const { walletAddress } = this.props.userData

        if(!walletAddress){
            return(
                <Redirect to="/" />
            )
        }

        if(deployContract){
            return(
                <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                    <Typography align="center">
                        Agreement Deploy! wait mining for view the Public Agreement data
                    </Typography>
                    <Typography style={{marginTop: 10}}>
                            Transaction Hash:
                        </Typography>
                    <Typography>
                            {txHashDeploy}
                        </Typography>
                    <a href={`https://rinkeby.etherscan.io/tx/${txHashDeploy}`} target="_blank">
                        <Typography>
                            View on EtherScan
                        </Typography>
                    </a>
                </Grid>
            )
        }

        return(
            <Grid container direction="column" justify="center" alignContent="center" alignItems="center">
                <Typography variant="h4" align="center" style={{ marginBottom: 10 }}>+ New Public Agreement</Typography>
                {documentData ?
                <Grid>
                    <Typography align="center">{documentData.docName}</Typography>
                    <Button style={{margin: 7 }} variant="contained" color="primary" onClick={() => this.setState({ viewDocModal: true })}>
                        View Doc </Button>
                    <Button style={{margin: 7 }} variant="contained" color="secondary" onClick={() => this.setState({ documentData: false })}>
                        Clear</Button>
                </Grid>
                :
                <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={() => this.setState({ openSelect: true })}>Select Document </Button>
                }
                
                <TextField value={textAddressTemp} onChange={(e) => this.setState({ textAddressTemp: e.target.value })} label="Ethereum Address" />
                <Button variant="contained" color="primary" onClick={this.addNewSigner}>Add Signer</Button>
                <ListSigners listSigners={listSigners} removeSigner={this.removeSigner} />

                <Button variant="contained" style={{ backgroundColor: 'green', color: 'white', margin: 10 }} onClick={this.deployContract}>Deploy New Contract</Button>
                
                <Dialog open={openSelect} onClose={this.closeSelectDocModal}>
                    <SelectDocument 
                        loadArAccount={this.loadArAccount}
                        files={arStorageList.fileList}
                        arUserData={arUserData}
                        closeModal={this.closeSelectDocModal}
                        selectDoc={this.selectDoc}
                        openDoc={this.openDoc}
                    />
                </Dialog>
                <ViewDoc open={viewDocModal} docFile={documentData.docFile || tempViewData} closeViewDoc={this.closeViewDoc} />

            </Grid>
        )
    }
}

export default NewAgreement