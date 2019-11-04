import React from 'react'
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import getBlockNotalContract from '../../web3/utils/getBlockNotalContract'


class VerifySignature extends React.Component{
    state = {
        signature: '', 
        arweaveUrl: '', 
        docHash: '',
        signerAddress: ''
    }

    verifySignature = async() => {
        const { signature, arweaveUrl, docHash, signerAddress } = this.state
        const data = {
            arDataUrl: arweaveUrl,
            dataSha256: docHash
        }
        try{
            const sigEdit = signature.substring(2)
            const r = "0x" + sigEdit.substring(0, 64)
            const s = "0x" + sigEdit.substring(64, 128)
            const v = parseInt(sigEdit.substring(128, 130), 16)
            const blockNotalContract = await getBlockNotalContract()
            const result = await blockNotalContract.methods.recoverAddressSign(data, v, r, s).call()
            if(signerAddress.toLowerCase() === result.toLowerCase()){
                alert('Valid Signature')
            }else{
                alert('Invalid Signature')
            }
            
        }catch(e){
            console.log(e)
            alert('Invalid Signature')
        }
    }

    render(){
        const { signature, arweaveUrl, docHash, signerAddress  } = this.state
        return(
            <Grid container alignContent="center" alignItems="center" justify="center" direction="column">
                        <Typography align="center">Arweave Data URL:</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }} value={arweaveUrl} onChange={(e) => this.setState({ arweaveUrl: e.target.value })} />
                        
                        <Typography align="center">Document SHA-256:</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }} value={docHash} onChange={(e) => this.setState({ docHash: e.target.value })} />
                        
                        <Typography align="center">Signer Ethereum Address :</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }} value={signerAddress} onChange={(e) => this.setState({ signerAddress: e.target.value })} />

                        <Typography align="center">Signature:</Typography>
                        <TextField style={{ backgroundColor: '#8080805e' }} value={signature} onChange={(e) => this.setState({ signature: e.target.value })} />

                        <Button onClick={this.verifySignature} variant="contained" style={{fontSize:10, maxWidth:150, margin:10}} color="primary">
                            Verify Signature
                        </Button>
            </Grid>
        )
    }
}


export default VerifySignature