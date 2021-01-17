import React, { PureComponent } from "react";
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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export default class extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isCancelBtnDown: false,
            isSignInBtnDown: false,
            isIDValifyBtnDown: false,
            isNickNameValifyBtnDown: false
        };
    }

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

    setIDValifyBtn(bool) {
        if (this.state.isIDValifyBtnDown !== bool) {
            this.setState({ isIDValifyBtnDown: bool });
        }
    }

    setNickNameValifyBtn(bool) {
        if (this.state.isNickNameValifyBtnDown !== bool) {
            this.setState({ isNickNameValifyBtnDown: bool });
        }
    }

    render() {

        const btnTheme = createMuiTheme({
            palette: {
                secondary: {
                    main: "#212121"
                }
            }
        });

        const valifyBtnTheme = createMuiTheme({
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
            <Dialog open={this.props.open}>
                <DialogTitle>{"Register"}</DialogTitle>
                <ThemeProvider theme={btnTheme}>
                    <DialogContent>
                        <DialogContentText>{ }</DialogContentText>
                        <Grid container>
                            <ThemeProvider theme={valifyBtnTheme}>
                                <Grid item xs={12}>
                                    <TextField label="ID" />
                                    <Button
                                        onMouseDown={() => this.setIDValifyBtn(true)}
                                        onMouseUp={() => this.setIDValifyBtn(false)}
                                        onMouseLeave={() => this.setIDValifyBtn(false)}
                                        color={
                                            this.state.isIDValifyBtnDown ? "secondary" : "primary"
                                        }
                                        variant="contained"
                                        style={{ position: "relative", top: "11px" }}
                                    >
                                        CHECK
                                </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Nick Name" />
                                    <Button
                                        onMouseDown={() => this.setNickNameValifyBtn(true)}
                                        onMouseUp={() => this.setNickNameValifyBtn(false)}
                                        onMouseLeave={() => this.setNickNameValifyBtn(false)}
                                        color={
                                            this.state.isNickNameValifyBtnDown
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
                            color={this.state.isCancelBtnDown ? "secondary" : ""}
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
