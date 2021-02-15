import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TimeTable from './TimeTable'

const styles = theme => ({
    flexContainer: {
        display: "flex",
        flexDirection: "column"
    },
    flexItem: {

        "&:nth-child(2)": {
            overflowY:"auto",
            minWidth:"300px",
            flexShrink:0,
        },
    },

});


class TimeTablePage extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props; // for style

        return (
            <div className={classes.flexContainer}>
                {/* tool bar setting */}
                <div className={classes.flexItem}>

                </div>
                {/* main  */}
                <div className={classes.flexItem} >
                    <TimeTable></TimeTable>
                </div>
                {/* aside  */}
                <div className={classes.flexItem}>

                </div>
            </div>
        );

    }
}

export default withStyles(styles)(TimeTablePage);