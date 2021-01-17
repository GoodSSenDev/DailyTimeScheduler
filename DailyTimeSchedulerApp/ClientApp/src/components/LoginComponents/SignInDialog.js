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


export default class SignInForm extends PureComponent {

    constructor (props) {
        super(props)
        this.state ={
            isCancelBtnDown: false,
            isSignInBtnDown: false
          };
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

    render(){
        
        const btnTheme = createMuiTheme({
            palette: {
                secondary: {
                    main: "#212121"
                }
            }
        });

        return(
            <Dialog open={this.props.isOpen}>
                <DialogTitle>{"Sign In"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{}</DialogContentText>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField label="ID" />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 20 }}>
                            <TextField label="Password" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={btnTheme}>
                        <Button
                            onMouseDown={() => this.setCancelBtn(true)}
                            onMouseUp={() => this.setCancelBtn(false)}
                            onMouseLeave={() => this.setCancelBtn(false)}
                            onClick={()=> this.props.closeDialogCallBack(false)}
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
                        SIGN IN
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>           
        )

    }

}