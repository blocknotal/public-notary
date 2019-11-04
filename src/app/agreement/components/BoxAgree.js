import React from 'react'
import { Grid, Typography, Button, Paper, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails  } from '@material-ui/core'
import makeBlockie from 'ethereum-blockies-base64'

const BoxAgree = props => {
    const { contract, userAddress, signDoc, viewDoc, hiddeOwner } = props 
    console.log(contract)
    return(
        <Grid container direction="column" alignItems="center" alignContent="center" style={{ marginTop: 5, marginBottom: 5 }}>
        <Paper style={{ padding: 10 }}>
        <Typography variant="h6" style={{ margin: 10 }}>Agreement #{contract[0]}</Typography>
                        {contract.signers.map((user, index) => {
                            if(user === userAddress && contract[1][index] === '1'){
                                return(
                                    <Grid style={{ backgroundColor: 'grey', padding: 10, margin: 10 }}>
                                        <Typography>Your signature is request</Typography>
                                        <Button variant="contained" onClick={() => signDoc(contract[0], contract.data)}>Sign Document</Button>
                                    </Grid>
                                )
                            }
                        })}
            <Grid container direction="column">
                <Typography variant="overline">Document URL:</Typography>
                <Typography variant="caption" style={{ wordBreak: 'break-all' }}>{contract.data.arDataUrl}</Typography>
                <Button onClick={() => viewDoc(contract.data.arDataUrl)} variant="contained" style={{ fontSize: 10 }}>View Doc</Button>
                <Typography variant="overline">Document SHA-256:</Typography>
                <Typography variant="caption" style={{ wordBreak: 'break-all' }}>{contract.data.dataSha256}</Typography>
                {hiddeOwner ? null :
                <React.Fragment>
                    <Typography variant="overline">Created By:</Typography>
                    <Typography variant="caption" style={{ wordBreak: 'break-all' }}>{contract[5]}</Typography>
                </React.Fragment>
                }
            </Grid>
            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<div class="arrow-down icon"></div>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Signataries</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Grid container justify="center" direction="column" alignItems="center" alignContent="center">
                {contract.signers.map((user, index) => (
                    <Grid container justify="center" direction="column" alignItems="center" alignContent="center" style={{ marginBottom: 5 }}>
                        <Avatar src={makeBlockie(user)} style={{ margin:3 }} />
                        <Typography align="center" variant="caption" style={{ wordBreak: 'break-all' }}>{user}</Typography>
                        {contract[1][index] === "1" && <Typography align="center">Pending Signature</Typography>}
                        {contract[1][index] === "2" && 
                            <React.Fragment>
                                <Typography align="center">Confirmed Signature</Typography>
                                <Typography style={{fontSize: 11}} align="center">Sign Proof:</Typography>
                                <Typography style={{fontSize: 10, wordBreak: 'break-all'}}>{`${contract.signatures[index].R}${contract.signatures[index].S.substring(2)}${Number(contract.signatures[index].V).toString(16)}`}</Typography>
                            </React.Fragment>
                        }
                    </Grid>
                ))}
            </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        </Paper>
        </Grid>
    )
}

export default BoxAgree