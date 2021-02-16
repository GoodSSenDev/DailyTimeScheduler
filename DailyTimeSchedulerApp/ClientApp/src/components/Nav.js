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
  tab1Bc: {
    "&:hover": {
      backgroundColor: "#B7E1F3"
    },
  },
  tab2Bc: {
    "&:hover": {
      backgroundColor: "#189AA8"
    },
  },
  tab3Bc: {
    "&:hover": {
      backgroundColor: "#AAD356"
    },
  },
  tab4Bc: {
    "&:hover": {
      backgroundColor: "#F9C908"
    },
  },
  tab5Bc: {
    "&:hover": {
      backgroundColor: "#F35844"
    },
  },
  tab6Bc: {
    "&:hover": {
      backgroundColor: "#2c387e"
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
    let userNickName = localStorage.getItem('user');
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
              style={(value === 0) ? { backgroundColor: "#2c387e" } :{}}
              className={classNames(classes.tab6Bc, classes.tabItem)}
              to='/' component={Link}
              label="Home"
              icon={<HomeIcon fontSize="large" />} />
            <Tab
              value={1}
              style={(value === 1) ? { backgroundColor: "#B7E1F3" } :{}}
              className={classNames(classes.tab1Bc, classes.tabItem)}
              to='/calendar' component={Link}
              label="Calendar"
              icon={<DateRangeSharpIcon fontSize="large" />} />
            <Tab
              value={2}
              style={(value === 2) ? { backgroundColor: "#189AA8" } :{}}
              className={classNames(classes.tab2Bc, classes.tabItem)}
              to='/analysis' component={Link}
              label="Analysis"
              icon={<TimelineSharpIcon fontSize="large" />} />
            <Tab
              value={3}
              style={(value === 3) ? { backgroundColor: "#AAD356" } :{}}
              className={classNames(classes.tab3Bc, classes.tabItem)}
              label="Item Three" />
            <Tab
              value={4}
              style={(value === 4) ? { backgroundColor: "#F9C908" } :{}}
              className={classNames(classes.tab4Bc, classes.tabItem)}
              label="Item Three" />
            <Tab
              value={5}
              style={(value === 5) ? { backgroundColor: "#F35844" } :{}}
              className={classNames(classes.tab5Bc, classes.tabItem)}
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