import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../img/logo-white.png";

const styles = () => ({
  drawerItemBox: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "#747d8c",
    '&:hover': {
        color:'#a4b0be'
    }
  },
  drawerItemIcon: {
    color: "inherit"
  },
  drawerListText: {
    fontSize: 16,
    color: "inherit",
    padding: 0
  },
  grow: {
    flexGrow: 1
  }
});

const DrawerList = props => {
  const { classes, clickDrawer } = props;

  const nav = [
    { name: "Home", route: "/home"},
    {
      name: "Agreements for Sign",
      route: "/home/agreements/sign"
    },
    {
      name: "Agreements Deploy",
      route: "/home/agreements/deploy"
    },
    {
      name: "Storage",
      route: "/home/storage"
    },
    { name: "Verify Signatures", route: "/home/verify" },
    { name: "Search", route: "/home/search" }

  ];

  return (
    <Fragment>
      <Grid container justify="center">
        {/* <img style={{ width: "80px", height: "80px", padding: 10, marginTop: 15, marginBottom:20 }} src={logo} alt="logo" /> */}
        <List styçe={{paddingTop:20}}>
          {nav.map(({ name, route, icon }, index) => (
            <Link onClick={clickDrawer} key={index} to={route}>
              <ListItem className={classes.drawerItemBox} button key={index}>
                <ListItemIcon className={classes.drawerItemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  className={classes.drawerListText}
                  classes={{ primary: classes.drawerListText }}
                  primary={name}
                />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(DrawerList);
