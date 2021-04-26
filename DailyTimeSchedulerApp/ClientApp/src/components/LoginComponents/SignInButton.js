import React, { Fragment, PureComponent } from 'react'
import { Button } from '@material-ui/core'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SigninDialog from './SignInDialog';


export default class SignInButton extends PureComponent {

    constructor(props) {
        super(props)

        this.state = { isSigInBtnDown: false, isDialogOpen: false }
    }

    //this method for the button change color when press happen
    setSignInBtn(bool) {
        if (this.state.isSigInBtnDown !== bool) {
            this.setState({ isSigInBtnDown: bool })
        }
    }

    //this method for opening the dialog by chaning the state 
    setSignInDialog(bool) {
        if (this.state.isDialogOpen !== bool) {
            this.setState({ isDialogOpen: bool })
        }
    }

    render() {

        const btnTheme = createMuiTheme({
            palette: {
                secondary: {
                    main: "#212121"
                },

            }
        });

        return (
            <Fragment>
                <ThemeProvider theme={btnTheme}>
                    <Button
                        style={this.props.style}
                        onMouseDown={() => this.setSignInBtn(true)}
                        onMouseUp={() => this.setSignInBtn(false)}
                        onMouseLeave={() => this.setSignInBtn(false)}
                        onClick={() => this.setSignInDialog(true)}
                        color={this.state.isSigInBtnDown ? "secondary" : "primary"}
                    >
                        SIGN IN
                    </Button>
                </ThemeProvider>
                <SigninDialog isOpen={this.state.isDialogOpen}
                    closeDialogCallBack={(bool) => this.setSignInDialog(bool)}
                />
            </Fragment>
        )

    }
}

