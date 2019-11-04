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
import { Link } from 'react-router-dom'
//Convert image to Data URI for upload on arweave
import blocknotalLogo from '../../img/notal-logo-white.png'
import styles from './styles'

class Login extends Component {
  state = {
    notAuthorize: false,
    noWeb3: false,
    waitingAuth: false,
    userNotRegistered: false,
    loading: false,
    ethereumAddress: '',
  }

  async componentDidMount() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts) {
          if (this.state.ethereumAddress !== accounts[0]) { this.setState({ ethereumAddress: accounts[0] }) }
        }
      })
    }
  }


  loginEthereum = async () => {
    const { fetchUserData } = this.props
    let accounts
    if (!window.ethereum && !window.web3) {
      console.log('not exits')
      return this.setState({ noWeb3: true })
    } if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        this.setState({ waitingAuth: true })
        await window.ethereum.enable()
        accounts = await web3.eth.getAccounts()
        return fetchUserData(accounts[0])
      } catch (err) {
        console.log('not autorize 1')
        return this.setState({ notAuthorize: true, waitingAuth: false })
      }
    } else if (window.web3) {
      this.setState({ waitingAuth: true })
      const web3 = new Web3(window.web3.currentProvider)
      accounts = await web3.eth.getAccounts()
      return fetchUserData(accounts[0])
    } else {
      console.log('not autorize 2')
      return this.setState({ notAuthorize: true, waitingAuth: false })
    }
  }

  change = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {
      notAuthorize, noWeb3
    } = this.state
    const { classes } = this.props
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
                <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>You not authorize Agryo to connect with your Ethereum account.<span onClick={this.loadWallet} style={{ color: 'blue' }}>Try Again</span></Typography>
              </Grid>
            </Grid>
          )}
                

          <Grid style={{ padding: 10, margin: 10 }} item>
            <Grid container justify="center" alignContent="center">
            <Button
                onClick={() => this.loginEthereum()}
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
