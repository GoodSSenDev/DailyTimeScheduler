import {SIGN_IN,SIGN_OUT} from './types'
import {signIn,singOut} from './actions'

const initialState = {
    isSignedIn: false,
}
//a reducer for checking signin function
const signInReducer = (state = initialState,action) => {
    switch(action.type){
        case SIGN_IN:
            return{
                ...state,
                isSignedIn: true,
            }
        case SIGN_OUT:
            return{
                ...state,
                isSignedIn: false,
            }
        default: return state
    }
}


export default signInReducer