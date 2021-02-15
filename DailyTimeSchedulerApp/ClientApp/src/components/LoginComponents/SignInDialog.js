import React, { PureComponent, createRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Grid,
    Button,
    DialogActions,
    CircularProgress
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";


export default class SignInForm extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isCancelBtnDown: false,
            isSignInBtnDown: false,
            isSignIning: false,
            errorMessage: ""
        };
        this.inputIDRef = createRef();
        this.inputPWRef = createRef();
    }
    // if isCancelBtnDown true means the Cancel button is pressed and the color changed
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


    async signInAsync() {
        this.setState({ isSignIning: true })
        let response = await this.sendSignInDataAsync()
        if(response.status === 401){
            this.setState({errorMessage:"ID or Password is incorrect"})
            this.setState({ isSignIning: false })
            return;
        }
        else if (response.status === 200){
            window.sessionStorage.setItem('user',await response.json())
            this.props.closeDialogCallBack(false)
            window.location.reload();
            return;
        }
        else {
            this.setState({errorMessage:"Unknown Error 1 occured"})
            this.setState({ isSignIning: false })
            return;
        }
    }

    async sendSignInDataAsync() {
        let signInData = {
            Id: this.inputIDRef.current.value,
            NickName: "ID_Check",
            Password: this.inputPWRef.current.value,
            AccessLevel: 1,
        }

        const response = await fetch(`api/Auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Accept': 'application/json'},
            body: JSON.stringify(signInData)
        });
        return response
    }



    render() {
        const btnTheme = createMuiTheme({
            palette: {
                secondary: {
                    main: "#212121"
                }
            }
        });

        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>{"Sign In"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.state.errorMessage}</DialogContentText>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField inputRef={this.inputIDRef} label="ID" />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 20 }}>
                            <TextField inputRef={this.inputPWRef} type="password" label="Password" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={btnTheme}>
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
                            disabled={this.state.isSignIning}
                            onMouseDown={() => this.setSignInBtn(true)}
                            onMouseUp={() => this.setSignInBtn(false)}
                            onMouseLeave={() => this.setSignInBtn(false)}
                            onClick={async () => this.signInAsync()}
                            color={this.state.isSignInBtnDown ? "secondary" : "primary"}
                            variant="contained"
                        >
                            SIGN IN
                        </Button>
                        {this.state.isRegistering && <CircularProgress size={28} style={{position:'absolute', bottom: '12px', right:'47px' }}/>}
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        )   

    }

}