import React, { Fragment, PureComponent } from 'react'
import { Button } from '@material-ui/core'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import RegisterDialog from './RegisterDialog'


export default class RegisterButton extends PureComponent {


    constructor(props) {
        super(props)

        this.state = { isRegisterBtnDown: false, isDialogOpen: false }
    }

    //this method for the button change color when press happen
    setRegisterBtn(bool) {
        if (this.state.isRegisterBtnDown !== bool) {
            this.setState({ isRegisterBtnDown: bool })
        }
    }

    //this method for opening the dialog by chaning the state 
    setRegisterDialog(bool) {
        if (this.state.isDialogOpen !== bool) {
            this.setState({ isDialogOpen: bool })
        }
    }

    render() {



        return (
            <Fragment>
                <Button
                    style={this.props.style}
                    onMouseDown={() => this.setRegisterBtn(true)}
                    onMouseUp={() => this.setRegisterBtn(false)}
                    onMouseLeave={() => this.setRegisterBtn(false)}
                    onClick={() => this.setRegisterDialog(true)}
                    color={this.state.isRegisterBtnDown ? "default" : "secondary"}
                    variant="outlined"
                >
                    REGISTER
                    </Button>
                <RegisterDialog
                    isOpen={this.state.isDialogOpen}
                    closeDialogCallBack={(bool) => this.setRegisterDialog(bool)} />
                    
            </Fragment>
        )

    }
}