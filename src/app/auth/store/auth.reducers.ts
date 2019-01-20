import * as AuthActions from "./auth.actions";

export interface State {
    token: string,
    authed: boolean
}

export const initialState: State = {
    token: null,
    authed: false   
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authed: true
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                authed: false
            }
        case AuthActions.SET_TOKEN: 
            return {
                ...state,
                token: action.payload
            }
        default: 
            return state
    }
}