import * as React from "react";
import {
    CurrentTimeIndicator
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

//refered Idea from issue  "How to scroll scheduler view to current hour automatically"
//in github Issue page
const useStyles = makeStyles((theme) => ({
    line: {
        height: "2px",
        width: "100%",
        transform: "translate(0, -1px)"
    },
    circle: {
        width: theme.spacing(1.5),
        height: theme.spacing(1.5),
        borderRadius: "50%",
        transform: "translate(-50%, -50%)"
    },
    nowIndicator: {
        position: "absolute",
        left: 0,
        top: ({ top }) => top,
        background: theme.palette.secondary.main,
        zIndex: 1
    }
}));

export default () => {
    const indicatorRef = React.useRef(null);
    const Indicator = ({ top, ...restProps }) => {
        const classes = useStyles({ top });

        return (
            <div {...restProps} ref={indicatorRef}>
                <div className={classNames(classes.nowIndicator, classes.circle)} />
                <div className={classNames(classes.nowIndicator, classes.line)} />
            </div>
        );
    };
    React.useEffect(() => {
        if(indicatorRef.current != null){
            indicatorRef.current.scrollIntoView({ block: "center" });

        }
    });

    return (
        <CurrentTimeIndicator indicatorComponent={Indicator} />
    );
};
