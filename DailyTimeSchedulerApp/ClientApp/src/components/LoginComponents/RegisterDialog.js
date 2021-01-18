import React, { createRef, PureComponent } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Grid,
    Button,
    DialogActions
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, withStyles } from "@material-ui/styles";
import green from '@material-ui/core/colors/green';


const styles = (theme) => ({
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
})

class RegisterDialog extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isIDChecked: false,
            isNickNameChecked: false,
            isIDDupCheckBtnDiabled: false,
            isNickNameDupCheckBtnDiabled: false,
            isCancelBtnDown: false,
            isSignInBtnDown: false,
            isIDDupCheckBtnDown: false,
            isNickNameDupCheckBtnDown: false
        };
        this.inputIDRef = createRef();
    }

    //#region button state functions

    setCancelBtn(bool) {
        if (this.state.isCancelBtnDown !== bool) {
            this.setState({ isCancelBtnDown: bool });
        }
    }

    setSignInBtn(bool) {
        if (this.state.isSignInBtnDown !== bool) {
            this.setState({ isSignInBtnDown: bool });
        }
    }

    //function for set state for ID duplication check button for color change
    setIDDupCheckBtn(bool) {
        if (this.state.isIDDupCheckBtnDown !== bool) {
            this.setState({ isIDValifyBtnDown: bool });
        }
    }

    setNickNameDupCheckBtn(bool) {
        if (this.state.isNickNameDupCheckBtnDown !== bool) {
            this.setState({ isNickNameValifyBtnDown: bool });
        }
    }

    //#endregion

    async checkIDDuplication() {
        this.setState({ isIDDupCheckBtnDiabled: true })
        await this.sendCheckData()
        this.setState({ isIDDupCheckBtnDiabled: false })
    }

    async sendCheckData() {
        const response = await fetch(`api/Auth/checkIDDuplication=${this.inputIDRef.current.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
    }


    render() {
        const btnTheme = createMuiTheme({
            palette: {
                secondary: {
                    main: "#212121"
                }
            }
        });

        const verifyBtnTheme = createMuiTheme({
            palette: {
                primary: {
                    main: "#43a047"
                },
                secondary: {
                    main: "#212121"
                }
            }
        });


        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>{"Register"}</DialogTitle>
                <ThemeProvider theme={btnTheme}>
                    <DialogContent>
                        <DialogContentText>{ }</DialogContentText>
                        <Grid container>
                            <ThemeProvider theme={verifyBtnTheme}>
                                <Grid item xs={12}>
                                    <TextField label="ID" inputRef={this.inputIDRef} />
                                    <Button
                                        disabled={this.state.isIDDupCheckBtnDiabled}
                                        onMouseDown={() => this.setIDDupCheckBtn(true)}
                                        onMouseUp={() => this.setIDDupCheckBtn(false)}
                                        onMouseLeave={() => this.setIDDupCheckBtn(false)}
                                        onClick={async () => this.checkIDDuplication()}
                                        color={
                                            this.state.isIDDupCheckBtnDown ? "secondary" : "primary"
                                        }
                                        variant="contained"
                                        style={{ position: "relative", top: "11px" }}
                                    >
                                        CHECK {this.state.isIDChecked ? <CheckIcon /> : <CloseIcon />}
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Nick Name" />
                                    <Button
                                        disabled={this.state.isNickNameDupCheckBtnDiabled}
                                        onMouseDown={() => this.setNickNameDupCheckBtn(true)}
                                        onMouseUp={() => this.setNickNameDupCheckBtn(false)}
                                        onMouseLeave={() => this.setNickNameDupCheckBtn(false)}
                                        color={
                                            this.state.isNickNameDupCheckBtnDown
                                                ? "secondary"
                                                : "primary"
                                        }
                                        variant="contained"
                                        style={{ position: "relative", top: "11px" }}
                                    >
                                        CHECK
                                </Button>
                                </Grid>
                            </ThemeProvider>
                            <Grid item xs={12}>
                                <TextField label="Password" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Confirm Password" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onMouseDown={() => this.setCancelBtn(true)}
                            onMouseUp={() => this.setCancelBtn(false)}
                            onMouseLeave={() => this.setCancelBtn(false)}
                            onClick={() => this.props.closeDialogCallBack(false)}
                            color={this.state.isCancelBtnDown ? "secondary" : "default"}
                            variant="contained"
                        >
                            CANCEL
                    </Button>
                        <Button
                            onMouseDown={() => this.setSignInBtn(true)}
                            onMouseUp={() => this.setSignInBtn(false)}
                            onMouseLeave={() => this.setSignInBtn(false)}
                            color={this.state.isSignInBtnDown ? "secondary" : "primary"}
                            variant="contained"
                        >
                            REGISTER
                    </Button>
                    </DialogActions>
                </ThemeProvider>
            </Dialog>
        );
    }
}


export default withStyles(styles)(RegisterDialog);