import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Web3 from 'web3'
import {
  Grid,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogContent,
  CircularProgress
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import blocknotalLogo from '../../img/notal-logo-white.png'
import styles from './styles'

class Login extends Component {
  state = {
    notAuthorize: false,
    noWeb3: false
  }



  loginEthereum = async () => {
    const { fetchUserData } = this.props
    this.setState({ noWeb3: false, notAuthorize: false })
    let accounts
    if (!window.ethereum && !window.web3) {
      return this.setState({ noWeb3: true })
    } if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        this.setState({ waitingAuth: true })
        await window.ethereum.enable()
        accounts = await web3.eth.getAccounts()
        return fetchUserData(accounts[0])
      } catch (err) {
        return this.setState({ notAuthorize: true })
      }
    } else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider)
      accounts = await web3.eth.getAccounts()
      return fetchUserData(accounts[0])
    } else {
      return this.setState({ notAuthorize: true })
    }
  }

  render() {
    const {
      notAuthorize, noWeb3
    } = this.state
    const { classes, userData } = this.props
    if(userData.walletAddress){
      return(
          <Redirect to="/home" />
      )
  }
    return (
      <Grid container className={classes.mainDiv}>
        <Grid
          container
          className={classes.box}
          justify="center"
          alignContent="center"
          direction="column"
        >
          <Grid container justify="center" alignContent="center">
            <img src={blocknotalLogo} align="center" alt="block-notal-logo" className={classes.blocknotalLogo} />
          </Grid>
          <Typography align="center">Descentralized Public Notary</Typography>
          <Divider variant="middle" />
          {noWeb3 && (
            <Grid container justify="center" alignContent="center" alignItems="center" style={{ padding: 10 }}>
              <Grid item className={classes.boxError}>
                <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>Not Detected any Ethereum Provider</Typography>
              </Grid>
            </Grid>
          )}
          {notAuthorize && (
            <Grid container justify="center" alignContent="center" alignItems="center" style={{ padding: 10 }}>
              <Grid item className={classes.boxError}>
                <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>You not authorize Agryo to connect with your Ethereum account.<span onClick={this.loginEthereum} style={{ color: 'blue' }}>Try Again</span></Typography>
              </Grid>
            </Grid>
          )}
                

          <Grid style={{ padding: 10, margin: 10 }} item>
            <Grid container justify="center" alignContent="center">
            <Button
                onClick={this.loginEthereum}
                className={classes.buttonConfirm}
                align="center"
                variant="contained"
              >
                Connect with a Ethereum Provider
              </Button>
            </Grid>
          </Grid>

        </Grid>
        <Dialog open={this.state.loading}>
          <DialogContent>
            <CircularProgress style={{ color: 'green' }} />
          </DialogContent>
        </Dialog>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login)
