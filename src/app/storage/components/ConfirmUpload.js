import React from 'react'
import { Grid, Typography } from "@material-ui/core"
import { Redirect } from 'react-router-dom'

const ConfirmDeployFile = props => {
      const { txHashDeploy } = props.location.state
    
    return(
        <Grid container direction="column" justify="center" alignItems="center" alignContent="center">
            <div style={{maxWidth: 700}}>
            <Typography>Document Deploy! wait mining for confirmation</Typography>

            <Typography style={{marginTop: 10}}>
                            Transaction Hash:
                        </Typography>
                    <Typography style={{ wordBreak: 'break-all' }}>
                            {txHashDeploy}
                        </Typography>
                    <a href={`https://viewblock.io/arweave/tx/${txHashDeploy}`} target="_blank">
                        <Typography>
                            View on Arweave Block Explorer(Only appear after confirmation)
                        </Typography>
                    </a>
            </div>
        </Grid>
    )
}

export default ConfirmDeployFile