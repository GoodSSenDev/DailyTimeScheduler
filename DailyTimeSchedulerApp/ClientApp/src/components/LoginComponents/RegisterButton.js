import React, { Fragment, PureComponent } from 'react'
import { Button } from '@material-ui/core'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import RegisterDialog from './RegisterDialog'


export default class RegisterButton extends PureComponent {


    constructor(props) {
        super(props)

        this.state = { isRegisterBtnDown: false, isDialogOpen: false}
    }

    //this method for the button change color when press happen
    setRegisterBtn(bool) {
        if (this.state.isRegisterBtnDown !== bool) {
            this.setState({ isRegisterBtnDown: bool })
        }
    }

    //this method for opening the dialog by chaning the state 
    openRegisterDialog(){
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
                        onMouseDown={() => this.setRegisterBtn(true)}
                        onMouseUp={() => this.setRegisterBtn(false)}
                        onMouseLeave={() => this.setRegisterBtn(false)}
                        onClick={() => this.openRegisterDialog()}
                        color={this.state.isRegisterBtnDown ? "secondary" : "primary"}
                        variant="contained"
                    >
                        REGISTER
                    </Button>
                </ThemeProvider>
                <RegisterDialog open={this.state.isDialogOpen}/>
            </Fragment>
        )

    }
}