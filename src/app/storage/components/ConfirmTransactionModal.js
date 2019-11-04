import React from 'react'
import { Dialog, DialogContent, Grid, Typography, Button } from "@material-ui/core";

const ConfirmTransactionModal = props => {
    const { open, docName, docHash, transactionFee, confirmUpload } = props
    return(
        <Dialog open={transactionFee}>
        <DialogContent>
            <Grid container alignItems="center" alignContent="center" direction="column" justify="center">
            <Grid container justify="center" alignContent="center" alignItems="center" style={{ padding: 10 }}>
              <Grid item style={{ backgroundColor: '#f1d0cc', maxWidth: 250, padding: 15,  borderRadius: 8}}>
                <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>This file will be public on Arweave Blockchain, if you don't want your document public, do not upload then</Typography>
              </Grid>
            </Grid>
                <Typography align="center" style={{ fontWeight: 600 }}>File Name</Typography>
                <Typography align="center">{docName}</Typography>
                <Typography align="center" style={{ fontWeight: 600, marginTop: 10  }}>File Hash(SHA-256)</Typography>
                <Typography align="center">{docHash}</Typography>
                <Typography align="center" style={{ fontWeight: 600, marginTop: 10 }}>Transaction Fee(AR)</Typography>
                <Typography align="center">{transactionFee}</Typography>
                <Button variant="contained" onClick={confirmUpload}>Confirm Upload</Button>
            </Grid>
        </DialogContent>
        </Dialog>
    )
}

export default ConfirmTransactionModal