import React, { Fragment, PureComponent } from 'react'
import { Button } from '@material-ui/core'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SigninDialog from './SignInDialog'


export default class SignInButton extends PureComponent {


    constructor(props) {
        super(props)

        this.state = { isSigInBtnDown: false, isDialogOpen: false}
    }

    //this method for the button change color when press happen
    setSignInBtn(bool) {
        if (this.state.isSigInBtnDown !== bool) {
            this.setState({ isSigInBtnDown: bool })
        }
    }

    //this method for opening the dialog by chaning the state 
    openSignInDialog(){
        this.setState({isDialogOpen: true})
        console.log("asda");
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
            <Fragment>
                <ThemeProvider theme={btnTheme}>
                    <Button
                        onMouseDown={() => this.setSignInBtn(true)}
                        onMouseUp={() => this.setSignInBtn(false)}
                        onMouseLeave={() => this.setSignInBtn(false)}
                        onClick={() => this.openSignInDialog()}
                        color={this.state.isSigInBtnDown ? "secondary" : "default"}
                        variant="contained"
                    >
                        SIGN IN
                    </Button>
                </ThemeProvider>
                <SigninDialog open={this.state.isDialogOpen}/>
            </Fragment>
        )

    }
}