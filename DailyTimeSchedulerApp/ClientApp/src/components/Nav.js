import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Tabs, Tab, IconButton, Menu, MenuItem, Box } from '@material-ui/core';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'
import { Link } from 'react-router-dom';

import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';

import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';

import NavMenu from './NavMenu';
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  flexItem: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,
  },
  tabItem: {
    color: "#9e9e9e",
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold'
  },
  tabHoverColor: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
  },
  tabNotSelected: {
    backgroundColor: theme.palette.primary.light,
  },
  buttonSpacing: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function NavMenuTab(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isNavClosed, setIsNavClosed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [navTabColour, setNavTabColor] = React.useState("#1c54b2");
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const open = Boolean(anchorEl);


  const handelScroll = () => {
    window.scrollY > 80
      ? setIsNavClosed(true)
      : setIsNavClosed(false)
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollDebounceDelay = 50;
  const activeNavDebounce = _.debounce(handelScroll, scrollDebounceDelay);

  //remove event when this component unmount
  useEffect(() => {

    const changeWindowSize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('scroll', activeNavDebounce);
    window.addEventListener('resize', changeWindowSize);
    return () => {
      window.removeEventListener('scroll', activeNavDebounce)
      window.removeEventListener('resize', changeWindowSize)
    }
  }, []);

  useEffect(() => {
    let userNickName = sessionStorage.getItem('user');

    if (userNickName != null) {
      setIsSignedIn(true);
    }
    else {
      setIsSignedIn(false);
    }
  });

  return (
    <Fragment>
      <Box style={{ height: props.height }} display={isNavClosed ? "inline" : "none"} style={{ padding: "10px", position: "fixed", zIndex: 1400 }}>
        <NavMenu></NavMenu>
      </Box>

      <AppBar className={classes.flexItem} elevation={3}>
        <Toolbar style={{ padding: 0, alignItems: "Space-between" }}>
          {(windowWidth > 500) ?
            <Tabs
              value={tabValue}
              className={classes.flexItem}
              onChange={handleChange}
              textColor="primary"
              scrollButtons="auto"
            >
              <Tab
                value={0}
                style={(tabValue === 0) ? { backgroundColor: navTabColour } : {}}
                className={classNames(classes.tabHoverColor, classes.tabItem)}
                to='/' component={Link}
                label="Home"
                icon={<HomeIcon fontSize="large" />} />
              <Tab
                value={1}
                style={(tabValue === 1) ? { backgroundColor: navTabColour } : {}}
                className={classNames(classes.tabHoverColor, classes.tabItem)}
                to='/calendar' component={Link}
                label="Calendar"
                icon={<DateRangeSharpIcon fontSize="large" />} />
              <Tab
                value={2}
                style={(tabValue === 2) ? { backgroundColor: navTabColour } : {}}
                className={classNames(classes.tabHoverColor, classes.tabItem)}
                to='/analysis' component={Link}
                label="Analysis"
                icon={<TimelineSharpIcon fontSize="large" />} />
            </Tabs>
            :
            <NavMenu></NavMenu>
          }
          <div>
            {isSignedIn ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>) :
              (<div className={classes.buttonSpacing}>
                <RegisterButton />
                <SignInButton />
              </div>)}
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}