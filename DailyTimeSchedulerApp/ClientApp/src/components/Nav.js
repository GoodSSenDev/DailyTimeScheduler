import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import HomeIcon from '@material-ui/icons/Home';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'
import { Link } from 'react-router-dom';
import { Label } from '@material-ui/icons';

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    flexDirection: '',
    justifyContent: "space-between",
    flextWrap: "wrap"
  },
  flexItem: {
    type: "light",
    marginBottom: 10,
    flexShrink: 1,
    "&:nth-child(1)": {
      minWidth:200,
    },
    "&:nth-child(2)": {
      flexShrink: 0,
      flexBasis: "100px",
      padding: "3px",
    }
  },
  tabItem: {
    minWidth:10,
    fontWeight: 'bold'
  },
  tab1Bc: {
    backgroundColor: "#B7E1F3",
  },
  tab2Bc: {
    backgroundColor: "#189AA8",
  },
  tab3Bc: {
    backgroundColor: "#AAD356",
  },
  tab4Bc: {
    backgroundColor: "#F9C908",
  },
  tab5Bc: {
    backgroundColor: "#F35844",
  },
  tab6Bc: {
    backgroundColor: "#2c387e",
  }
});

export default function NavMenuTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [nickName, setNickName] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let userNickName = localStorage.getItem('user')
    if (userNickName != null) {
      setIsSignedIn(true)
      setNickName(userNickName)
    }
    else {
      setIsSignedIn(false)
    }
  })

  return (
    <div className={classes.flexContainer}>
      <Paper className={classes.flexItem} elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon label tabs example"
          className={classes.flexContainer}
        >
          <Tab
            value={0}
            className={classNames(classes.tab6Bc, classes.tabLabel)}
            to='/' component={Link}
            label="Home"
            icon={<HomeIcon fontSize="large" />} />
          <Tab
            value={1}
            className={classNames(classes.tab1Bc, classes.tabLabel)}
            to='/counter' component={Link}
            label="Calendar"
            icon={<DateRangeSharpIcon fontSize="large" />} />
          <Tab
            value={2}
            className={classNames(classes.tab2Bc, classes.tabLabel)}
            to='/tempHome' component={Link}
            label="Analysis"
            icon={<TimelineSharpIcon fontSize="large" />} />
          <Tab
            value={3}
            className={classNames(classes.tab3Bc, classes.tabLabel)}
            label="Item Three" />
          <Tab
            value={4}
            className={classNames(classes.tab4Bc, classes.tabLabel)}
            label="Item Three" />
          <Tab
            value={5}
            className={classNames(classes.tab5Bc, classes.tabLabel)}
            label="Item Three" />
        </Tabs>
      </Paper>
      <Paper className={classes.flexItem} elevation={3}>
        {isSignedIn ? (<Typography variant="h6" > Hello {nickName}</Typography>) :
          (<Fragment>
            <RegisterButton style={{ width: "100%" }}/>
            <SignInButton style={{ width: "100%" }} />
          </Fragment>)}
      </Paper>
    </div>
  );
}