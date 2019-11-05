import React from 'react'
import { Grid, Typography } from "@material-ui/core"
import { Redirect } from 'react-router-dom'

const ConfirmSignature = props => {
    if(!props.location.state.signDeployData){
        return(
            <Redirect to="/" />
        )
    }
    const { signature, agreeId, txHashDeploy } = props.location.state.signDeployData
    return(
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
            <div style={{maxWidth: 700}}>
            <Typography>Signature Deploy! wait mining for confirmation</Typography>
            <Typography variant="h6" style={{margin: 10}}>Agreement #{agreeId}</Typography>
            <Typography>Signature:</Typography>
            <Typography style={{ wordBreak: 'break-all' }}>{signature}</Typography>
            <Typography style={{marginTop: 10}}>
                            Transaction Hash:
                        </Typography>
                    <Typography style={{ wordBreak: 'break-all' }}>
                            {txHashDeploy}
                        </Typography>
                    <a href={`https://rinkeby.etherscan.io/tx/${txHashDeploy}`} target="_blank">
                        <Typography>
                            View on EtherScan
                        </Typography>
                    </a>
            </div>
        </Grid>
    )
}

export default ConfirmSignature