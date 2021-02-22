import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Typography } from '@material-ui/core';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'
import { Link } from 'react-router-dom';

import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import HomeIcon from '@material-ui/icons/Home';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';

import NavPoperover from './NavPopover';
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: "flex",
    flexDirection: '',
    flextWrap: "wrap"
  },

  flexItem: {
    type: "light",
    marginBottom: 10,
    flexShrink: 1,
    "&:nth-child(1)": {
      minWidth: 200,
      width: "100%",
    },
    "&:nth-child(3)": {
      flexShrink: 0,
      flexBasis: "100px",
      padding: "3px",
    }
  },
  tabSpace: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "0",
  },
  tabItem: {
    color:"#9e9e9e",
    backgroundColor: theme.palette.primary.light,
    fontWeight: 'bold'
  },
  tabHoverColor: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
  },
  tabNotSelected: { 
    backgroundColor: theme.palette.primary.light, }
}));

export default function NavMenuTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [nickName, setNickName] = React.useState("");
  const [isNavClosed, setIsNavClosed] = React.useState(false);
  const [navTabColour, setNavTabColor] = React.useState("#1c54b2");

  const handelScroll = () => {
    window.scrollY > 80
      ? setIsNavClosed(true)
      : setIsNavClosed(false)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <NavPoperover isDisplay={isNavClosed}></NavPoperover>
      <div className={classes.flexContainer}>
        <Paper className={classNames(classes.flexItem, classes.tabSpace)} elevation={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
          >
            <Tab
              value={0}
              color="secondary.main"
              style={(value === 0) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/' component={Link}
              label="Home"
              icon={<HomeIcon fontSize="large" />} />
            <Tab
              value={1}
              style={(value === 1) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/calendar' component={Link}
              label="Calendar"
              icon={<DateRangeSharpIcon fontSize="large" />} />
            <Tab
              value={2}
              style={(value === 2) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              to='/analysis' component={Link}
              label="Analysis"
              icon={<TimelineSharpIcon fontSize="large" />} />
            <Tab
              value={3}
              style={(value === 3) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              label="Item Three" />
            <Tab
              value={4}
              style={(value === 4) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              label="Item Three" />
            <Tab
              value={5}
              style={(value === 5) ? { backgroundColor: navTabColour } :{}}
              className={classNames(classes.tabHoverColor, classes.tabItem)}
              label="Item Three" />
          </Tabs>

        </Paper>

        <Paper className={classNames(classes.flexItem, classes.tabSpace)} elevation={3}>
          {isSignedIn ? (<Typography variant="h6" > Hello {nickName}</Typography>) :
            (<Fragment>
              <RegisterButton style={{ width: "100%", marginTop: "2px", borderRadius: "0" }} />
              <SignInButton style={{ width: "100%", marginTop: "3px", borderRadius: "0" }} />
            </Fragment>)}
        </Paper>
      </div>
    </Fragment>
  );
}