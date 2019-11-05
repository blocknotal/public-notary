import React from 'react'
import { Grid, Typography, Button, TextField, Dialog } from '@material-ui/core'
import getBlockNotalContract from '../../web3/utils/getBlockNotalContract'
import BoxAgree from './components/BoxAgree'
import LoadingModal from '../../utils/LoadingModal'
import getDocByUrl from '../../web3/utils/getDocByUrl'
import { getPdfFileData } from '../../utils/readDataUtils'
import downloadFile from '../../utils/downloadDocument'

class SearchAgree extends React.Component{
    state = {
        searchAgreeId: '',
        searchHash: '',
        agreeData: false,
        loadingModal: false,
        docViewData: false,
        viewDocModal: false
    }

    searchById = async() => {
        const { searchAgreeId } = this.state
        try{
            this.setState({ agreeData: false, loadingModal: true })
            const blockNotalContract = await getBlockNotalContract()
            const agreeData = await blockNotalContract.methods.getAgreeFullData(searchAgreeId).call()
            if(agreeData[1].length === 0 || !agreeData || agreeData[0] === "0"){
                this.setState({ loadingModal: false })
                alert('Not Found')
            }else{
                this.setState({ agreeData, loadingModal: false })
            }
            console.log(agreeData)
        }catch(e){
            console.log(e)
            this.setState({ loadingModal: false })
        }
    }

    searchByHash = async() => {
        const { searchHash } = this.state
        try{
            this.setState({ agreeData: false, loadingModal: true })
            const blockNotalContract = await getBlockNotalContract()
            const agreeData = await blockNotalContract.methods.getAgreeByHash(searchHash).call()
            if(agreeData[1].length === 0 || !agreeData || agreeData[0] === "0"){
                this.setState({ loadingModal: false })
                alert('Not Found')
            }else{
                this.setState({ agreeData, loadingModal: false })
            }
            console.log(agreeData)
        }catch(e){
            console.log(e)
            this.setState({ loadingModal: false })
        }
    }

    searchByFile = async (event) => {
        const file = event.target.files[0]
        try{
            this.setState({ agreeData: false, loadingModal: true })
            const { docHash } = await getPdfFileData(file)
            const blockNotalContract = await getBlockNotalContract()
            const agreeData = await blockNotalContract.methods.getAgreeByHash(docHash).call()
            if(agreeData[1].length === 0 || !agreeData || agreeData[0] === "0"){
                this.setState({ loadingModal: false })
                alert('Not Found')
            }else{
                this.setState({ agreeData, loadingModal: false })
            }
            console.log(agreeData)
        }catch(err){
            console.log(err)
            this.setState({ loadingModal: false })
        }
    }

    viewDoc = async(dataUrl) => {
        try{
            this.setState({ loadingModal: true })
            const docData = await getDocByUrl(dataUrl)
            downloadFile(docData)
        }catch(err){
            console.log(err)
            this.setState({ loadingModal: false })
        }
    }

    closeViewDoc = () => this.setState({ docViewData: false, viewDocModal: false })

    render(){
        const { searchAgreeId, searchHash, agreeData, loadingModal, viewDocModal, docViewData } = this.state
        return(
            <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
                <div style={{ maxWidth: 600 }}>
                    <Grid container style={{margin:20}} direction="column" alignContent="center" alignItems="center" justify="center">
                        <Typography align="center">Search by Agree Id:</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }} value={searchAgreeId} onChange={(e) => this.setState({ searchAgreeId: e.target.value })} />
                        <Button onClick={this.searchById} variant="contained" style={{fontSize:10, maxWidth:150, margin:10}} color="primary">Search</Button>
                    </Grid>
                    <Grid container style={{margin:20}} direction="column" alignContent="center" alignItems="center" justify="center">
                        <Typography align="center">Search by Document:</Typography>
                        <Button variant="contained" onClick={() => document.getElementById('checkDocument').click()} style={{fontSize:10, maxWidth:150, margin:10}} color="primary">
                            Load Document
                        </Button>
                        <input type="file" accept="application/pdf"  onChange={(e) => this.searchByFile(e)} id="checkDocument" style={{display: "none"}}/>
                    </Grid>
                    <Grid container style={{margin:20}} direction="column" alignContent="center" alignItems="center" justify="center">
                        <Typography align="center">Search by Document Hash:</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }}  value={searchHash} onChange={(e) => this.setState({ searchHash: e.target.value })}/>
                        <Button onClick={this.searchByHash}  variant="contained" style={{fontSize:10, maxWidth:150, margin:10}} color="primary">Search</Button>
                    </Grid>
                    {agreeData &&
                    <Grid container style={{margin:20}} direction="column" alignContent="center" alignItems="center" justify="center">
                        <BoxAgree contract={agreeData} viewDoc={this.viewDoc}/>)
                    </Grid>
                    }
                </div>
                <LoadingModal open={loadingModal} />
            </Grid>
        )
    }
}


export default SearchAgree