import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import HomeIcon from '@material-ui/icons/Home';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'
import { Link } from 'react-router-dom';
import { Label } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    type: "light",
    flexGrow: 1,
    marginBottom: 10,
  },
  tabLabel: {
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

    <Grid container >

      <Grid item xs={10}>
        <Paper className={classes.root} elevation={3}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs example"
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
      </Grid>
      <Grid item xs={2}>
        <Paper className={classes.root} elevation={3}>
          {isSignedIn ? (<Typography variant="h6" > Hello {nickName}</Typography>) :
            (<Fragment>
              <RegisterButton />
              <SignInButton/>
            </Fragment>)}
        </Paper>
      </Grid>
    </Grid>

  );
}