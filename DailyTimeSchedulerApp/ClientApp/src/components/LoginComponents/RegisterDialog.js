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
            isNickNameDupCheckBtnDown: false,
            errorMessage: "",
            isPasswordConfirmed: false,
            isPasswordEnough: false,

        };
        this.inputIDRef = createRef();
        this.inputNickNameRef = createRef();
        this.inputPWRef = createRef();
        this.inputConfirmPWRef = createRef();
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


    //#region  IDDupCheck
    uncheckIDDup() {
        if (this.state.isIDChecked) {
            this.setState({ isIDChecked: false })
        }
    }

    async checkIDDuplicationAsync() {
        if (!this.state.isIDChecked) {
            this.setState({ isIDDupCheckBtnDiabled: true })
            const statusCode = await this.sendIDCheckDupAsync()

            if (statusCode === 200) {
                this.setState({ isIDChecked: true })
            }
            else if (statusCode === 409) {
                this.setState({ errorMessage: "Selected ID Already exist" })
            }
            else (
                this.setState({ errorMessage: "Unknown error occurs while ID Duplication Check" })
            )

            this.setState({ isIDDupCheckBtnDiabled: false })
        }
    }

    //this method send  ID to check if there is duplicate ID exist and return status 200 : ok , 409: already exist
    async sendIDCheckDupAsync() {
        const response = await fetch(`api/Auth/checkIDDuplication=${this.inputIDRef.current.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.status;

    }
    //#endregion

    //#region  NickNameDupCheck
    uncheckNickNameDup() {
        if (this.state.isNickNameChecked) {
            this.setState({ isNickNameChecked: false })
        }
    }

    async checkNickNameDuplicationAsync() {
        if (!this.state.isNickNameChecked) {
            this.setState({ isNickNameDupCheckBtnDiabled: true })
            const statusCode = await this.sendNickNameCheckDupAsync()

            if (statusCode === 200) {
                this.setState({ isNickNameChecked: true })
            }
            else if (statusCode === 409) {
                this.setState({ errorMessage: "Selected NickName Already exist" })
            }
            else (
                this.setState({ errorMessage: "Unknown error occurs while NickName Duplication Check" })
            )

            this.setState({ isNickNameDupCheckBtnDiabled: false })
        }
    }

    //this method send nickname to check if there is duplicate nickname exist and return status 200 : ok , 409: already exist
    async sendNickNameCheckDupAsync() {
        const response = await fetch(`api/Auth/checkNickNameDuplication=${this.inputNickNameRef.current.value}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.status;

    }
    //#endregion



    checkPasswordFollowingRule(e) {
        if (e.target.value.length > 5) {
            return true
        }
        else {
            this.setState({ errorMessage: "The length of the password have to be longer than 5" })
            return false
        }
    }

    confirmPassword(e) {
        if (this.checkPasswordFollowingRule(e)) {


            if (this.inputPWRef.current.value === this.inputConfirmPWRef.current.value) {
                this.setState({ isPasswordConfirmed: true })
                this.setState({ errorMessage: "The PW is confrimed" })
            }
            else {
                this.setState({ isPasswordConfirmed: false })
                this.setState({ errorMessage: "The PW is not confrimed" })
            }
        }
    }

    async registerAccount(){
        await this.checkIDDuplicationAsync()
        await this.checkNickNameDuplicationAsync()
        console.log(this.state.isIDChecked)
        console.log(this.state.isNickNameChecked)
        console.log(this.state.isPasswordConfirmed)

        if(this.state.isIDChecked && this.state.isNickNameChecked && this.state.isPasswordConfirmed){

            let statusCode = await this.sendRegisterAsync()
            console.log(statusCode)

            if(statusCode === 200){
                return true
            } else { 
                this.setState({ errorMessage: "Unknown Error occured on registering" })
                
            }
        }
        return false
    }
    
    async sendRegisterAsync() {
        let registerData = {
            Id: this.inputIDRef.current.value,
            NickName:this.inputNickNameRef.current.value,
            Password:this.inputPWRef.current.value,
            AccessLevel:1
        }

        const response = await fetch(`api/Auth/Register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });

        return response.status
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
                        <DialogContentText>{this.state.errorMessage}</DialogContentText>
                        <Grid container>
                            <ThemeProvider theme={verifyBtnTheme}>
                                <Grid item xs={12}>
                                    <TextField label="ID" inputRef={this.inputIDRef} onChange={() => this.uncheckIDDup()} />
                                    <Button
                                        disabled={this.state.isIDDupCheckBtnDiabled}
                                        onMouseDown={() => this.setIDDupCheckBtn(true)}
                                        onMouseUp={() => this.setIDDupCheckBtn(false)}
                                        onMouseLeave={() => this.setIDDupCheckBtn(false)}
                                        onClick={async () => this.checkIDDuplicationAsync()}
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
                                    <TextField label="Nick Name" inputRef={this.inputNickNameRef} onChange={() => this.uncheckNickNameDup()} />
                                    <Button
                                        disabled={this.state.isNickNameDupCheckBtnDiabled}
                                        onMouseDown={() => this.setNickNameDupCheckBtn(true)}
                                        onMouseUp={() => this.setNickNameDupCheckBtn(false)}
                                        onMouseLeave={() => this.setNickNameDupCheckBtn(false)}
                                        onClick={async () => this.checkNickNameDuplicationAsync()}
                                        color={
                                            this.state.isNickNameDupCheckBtnDown
                                                ? "secondary"
                                                : "primary"
                                        }
                                        variant="contained"
                                        style={{ position: "relative", top: "11px" }}
                                    >
                                        CHECK {this.state.isNickNameChecked ? <CheckIcon /> : <CloseIcon />}
                                    </Button>
                                </Grid>
                            </ThemeProvider>
                            <Grid item xs={12}>
                                <TextField label="Password" type="password" onChange={(e) => this.confirmPassword(e)} inputRef={this.inputPWRef} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Confirm Password" type="password" onChange={(e) => this.confirmPassword(e)} inputRef={this.inputConfirmPWRef} />
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
                            onClick={async () => this.registerAccount()}
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