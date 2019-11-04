import React from 'react'
import {
  InputBase,
  Popover,
  Typography,
  Divider,
  Hidden,
  IconButton,
  Grid,
  Avatar,
} from '@material-ui/core'
import makeBlockie from 'ethereum-blockies-base64'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import logo from '../../img/logo-white.png'
import notalLogo from '../../img/notal-logo-white.png'

const styles = theme => ({
  menuButton: {
    paddingTop: 15,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  inputBase: {
    fontSize: '12px',
    color: 'black',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    paddingTop: 20,
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  typography: {
    margin: theme.spacing.unit * 2,
    marginTop: 9,
    marginBottom: 9,
    fontSize: 10,
  },
  userOptions: {
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    paddingBottom: 9,
  },
})

const ToolbarContent = ({
  classes,
  handleDrawerToggle,
  handleClick,
  userAddress,
  anchorEl,
  handleClose,
}) => (
  <Grid style={{backgroundColor:'transparent'}} container direction="row">
    <Grid item align="center">
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <div class="menu icon"></div>
      </IconButton>
      <Hidden xsDown>
        <img style={{ width: '170px', height: '50px' }} src={notalLogo} alt="Block Notal" />
      </Hidden>
    </Grid>
    <Grid item style={{ marginLeft: 'auto' }}>
      <Hidden only={['lg', 'xl', 'md', 'sm']}>
        <img style={{ width: 45, height: 45, marginTop: 5 }} src={logo} alt="Block Notal" />
      </Hidden>
    </Grid>
    {/* <Grid item style={{ marginLeft: 'auto' }}>
      <IconButton
        aria-owns={anchorEl ? 'simple-popper' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{ alignSelf: 'flex-end' }}
        color="inherit"
      >
        <Avatar src={makeBlockie(userAddress)} />
      </IconButton>
      <Popover
        id="simple-popper"
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {' '}
        <Grid
          container
          className={classes.userOptions}
          justify="center"
          alignContent="center"
          direction="column"
        >
          <Typography align="center" className={classes.typography}>
            Rinkeby Testnet
          </Typography>
          <Divider variant="middle" />
          <Typography align="center" className={classes.typography}>
            Profile
          </Typography>
          <Divider variant="middle" />
          <Typography align="center" className={classes.typography}>
            Settings{' '}
          </Typography>
          <Divider variant="middle" />
          <Typography align="center" className={classes.typography}>
            Logout
          </Typography>
        </Grid>
      </Popover>
    </Grid> */}
  </Grid>
)

export default withStyles(styles, { withTheme: true })(ToolbarContent)
