import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import HomeIcon from '@material-ui/icons/Home';
import RegisterButton from './LoginComponents/RegisterButton'
import SignInButton from './LoginComponents/SignInButton'

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

export default function CenteredTabs() {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signInSuccess = () => {
    setIsSignIn(true)
    console.log("Login Success")
  }

  if (isSignIn)
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
              <Tab className={classNames(classes.tab6Bc, classes.tabLabel)} label="Home" icon={<HomeIcon fontSize="large" />} />
              <Tab className={classNames(classes.tab1Bc, classes.tabLabel)} label="Calendar" icon={<DateRangeSharpIcon fontSize="large" />} />
              <Tab className={classNames(classes.tab2Bc, classes.tabLabel)} label="Analysis" icon={<TimelineSharpIcon fontSize="large" />} />
              <Tab className={classNames(classes.tab3Bc, classes.tabLabel)} label="Item Three" />
              <Tab className={classNames(classes.tab4Bc, classes.tabLabel)} label="Item Three" />
              <Tab className={classNames(classes.tab5Bc, classes.tabLabel)} label="Item Three" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    );
  else
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
              <Tab className={classNames(classes.tab6Bc, classes.tabLabel)} label="Home" icon={<HomeIcon fontSize="large" />} />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.root} elevation={3}>
            <RegisterButton />
            <SignInButton signInSuccess={signInSuccess} />
          </Paper>
        </Grid>
      </Grid>

    );
}