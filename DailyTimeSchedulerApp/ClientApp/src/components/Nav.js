import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, AppBar, Tabs, Tab,IconButton, Menu ,MenuItem} from '@material-ui/core';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'
import { Link } from 'react-router-dom';

import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';

import AccountCircle  from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';

import NavPoperover from './NavPopover';
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  flexItem: {
    type: "light",
    flexGrow: 1,
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
  }
}));

export default function NavMenuTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [nickName, setNickName] = React.useState("");
  const [isNavClosed, setIsNavClosed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [navTabColour, setNavTabColor] = React.useState("#1c54b2");
  const open = Boolean(anchorEl);


  const handelScroll = () => {
    window.scrollY > 80
      ? setIsNavClosed(true)
      : setIsNavClosed(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    window.addEventListener("scroll", activeNavDebounce);
    return () => {
      window.removeEventListener("scroll", activeNavDebounce)
    }
  }, []);

  useEffect(() => {
    let userNickName = sessionStorage.getItem('user');
    if (userNickName != null) {
      setIsSignedIn(true);
      setNickName(userNickName);
    }
    else {
      setIsSignedIn(false);
    }
  });

  return (
    <Fragment>
      <NavPoperover style={{ height: props.height }} isDisplay={isNavClosed}></NavPoperover>
      <AppBar className={classes.flexItem} elevation={3}>
        <Toolbar style={{ padding: 0 }}>
          <Tabs
            value={value}
            className={classes.flexItem}
            onChange={handleChange}
            textColor="primary"
            scrollButtons="auto"
          >
            <Tab
              value={0}
              style={(value === 0) ? { backgroundColor: navTabColour } : {}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/' component={Link}
              label="Home"
              icon={<HomeIcon fontSize="large" />} />
            <Tab
              value={1}
              style={(value === 1) ? { backgroundColor: navTabColour } : {}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/calendar' component={Link}
              label="Calendar"
              icon={<DateRangeSharpIcon fontSize="large" />} />
            <Tab
              value={2}
              style={(value === 2) ? { backgroundColor: navTabColour } : {}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/analysis' component={Link}
              label="Analysis"
              icon={<TimelineSharpIcon fontSize="large" />} />
          </Tabs>
          {isSignedIn ? (
          <div>
            <IconButton
              aria-label="account of current user"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large"  />
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
            (<Fragment>
              <RegisterButton />

              <SignInButton />
            </Fragment>)}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}