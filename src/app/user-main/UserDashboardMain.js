import React from 'react'
import { AppBar, CssBaseline, Toolbar, Grid } from '@material-ui/core'

import DrawerList from './DrawerList'
import DrawerBase from './DrawerBase'
import { withStyles } from '@material-ui/core/styles'
import ToolbarContent from './ToolbarContent'

const drawerWidth = 240

const styles = theme => ({
  root: {
    //display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 220
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // marginLeft: drawerWidth,
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - 200px)`,
    // },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    //flexGrow: 1,
    //padding: theme.spacing.unit * 3,
  },
  boxContent:{
    padding: 10
  }
})

class UserDashboardMain extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  clickAndCloseToggle = () => {
    if (this.state.mobileOpen === false) {
      return
    } else {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
  }

  render() {
    const { classes, userAddress, children } = this.props
    const { anchorEl, mobileOpen } = this.state

    return (
      <div className={classes.root}>
      <Grid container style={{backgroundColor:'black', height:30}}></Grid>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ backgroundColor: 'black', color: 'white' }}>
            <ToolbarContent
              handleDrawerToggle={this.handleDrawerToggle}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
              userAddress={userAddress}
              anchorEl={anchorEl}
            />
          </Toolbar>
        </AppBar>
        <DrawerBase mobileOpen={mobileOpen} clickDrawer={this.handleDrawerToggle}>
          <DrawerList clickDrawer={this.clickAndCloseToggle} />
        </DrawerBase>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.boxContent}>
          {children}
          </div>
        </main>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(UserDashboardMain)
