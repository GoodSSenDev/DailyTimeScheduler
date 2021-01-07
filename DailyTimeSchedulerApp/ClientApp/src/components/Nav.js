import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';




const useStyles = makeStyles({
  root: {
    type: "light",
    flexGrow: 1,
  },
  tabLabel:{
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
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root} > 
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
        
      >
        <Tab className={classNames(classes.tab1Bc,classes.tabLabel)} label="Calendar" icon={<DateRangeSharpIcon fontSize="large"/>}  />
        <Tab className={classNames(classes.tab2Bc,classes.tabLabel)} label="Analysis"  icon={<TimelineSharpIcon fontSize="large"/>}/>
        <Tab className={classNames(classes.tab3Bc,classes.tabLabel)} label="Item Three" />
        <Tab className={classNames(classes.tab4Bc,classes.tabLabel)} label="Item Three" />
        <Tab className={classNames(classes.tab5Bc,classes.tabLabel)} label="Item Three" />

        
      </Tabs>

    </Paper>
    
  );
}