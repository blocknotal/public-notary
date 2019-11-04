import React from 'react'
import { Grid, Button } from '@material-ui/core'

const UploadArweaveAccount = props => (
    <Grid container direction="column" alingContent="center" alignItems="center">
        <Button variant="contained" onClick={() => document.getElementById('uploadArweaveAccount').click()} style={{fontSize:10, maxWidth:150, margin:10}} color="primary">
            Load Arweave Storage Wallet
        </Button>
        <input type="file" onChange={(e) => props.loadArAccount(e)} id="uploadArweaveAccount" style={{display: "none"}}/>
    </Grid>
)

export default UploadArweaveAccount