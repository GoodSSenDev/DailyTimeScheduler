import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import { Label } from '@material-ui/icons';
import React, { Component } from 'react'


export default class SignInForm extends Component {

    constructor (props) {
        super(props)
        this.state ={
            exercises,
            isCancelBtnDown: false,
            isSignInBtnDown: false
          };
    }

    setCancelBtn(bool) {
        if (this.state.isCancelBtnDown !== bool) {
          this.setState({ isCancelBtnDown: bool });
          console.log(bool);
        }
    }
    setSignInBtn(bool) {
        if (this.state.isSignInBtnDown !== bool) {
          this.setState({ isSignInBtnDown: bool });
        }
    }

    render(){
        
        const [isOpen, setOpen] = React.useState(false); 
    
        return(
            <Dialog open={true}>
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
                    <ThemeProvider theme={theme}>
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
                        SIGN IN
                        </Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>           
        )

    }

}