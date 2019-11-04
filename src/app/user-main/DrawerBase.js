import React from 'react'
import { Drawer, Hidden } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 200

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'black;',
    color: 'white',
  },
  [theme.breakpoints.up("sm")]: {
    drawerPaper:{
      marginTop: '64px'
    }
  }
})

function DrawerBase({ classes, theme, mobileOpen, clickDrawer, children }) {
  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={clickDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  )
}


export default withStyles(styles, { withTheme: true })(DrawerBase)
