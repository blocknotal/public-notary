import React from 'react'
import { Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

const ConfirmSignature = props => {
    const { signature, agreeId, txHashDeploy } = props.location.state.signDeployData
    if(!signature || !agreeId || !txHashDeploy){
        return(
            <p>Error</p>
        )
    }
    return(
        <Grid container justify="center" alignItems="center" alignContent="center">
            <Typography>Signature Deploy! wait mining for confirmation</Typography>
            <Typography>Agreement #{agreeId}</Typography>
            <Typography>Signature:</Typography>
            <Typography>{signature}</Typography>
            <Typography style={{marginTop: 10}}>
                            Transaction Hash:
                        </Typography>
                    <Typography>
                            {txHashDeploy}
                        </Typography>
                    <Link to={`https://rinkeby.etherscan.io/tx/${txHashDeploy}`} target="_blank">
                        <Typography>
                            View on EtherScan
                        </Typography>
                    </Link>
        </Grid>
    )
}

export default ConfirmSignature