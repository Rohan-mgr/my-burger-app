import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../container/shared/utility";

const initialState = {
    token: null, 
    userId: null, 
    error: null, 
    loading: false,
    authRedirectPath: "/",
}

const authStart = (state) => {
    return updateObject(state, {
        loading: true, 
        error: false,
    })
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId, 
        error: false, 
        loading: false,
    })
}
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error, 
        loading: false,
    })
}

const authLogOut = (state) => {
    return updateObject(state, {
        token: null, 
        userId: null,
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path,
    });
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state);
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: 
            return authLogOut(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: 
            return setAuthRedirectPath(state, action);
        default: 
            return state;
    }
}
export default authReducer;