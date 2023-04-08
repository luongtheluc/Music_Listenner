import actionTypes from "../actions/actionTypes";

const initState = {
    isLoggedIn: false,
    token: null,
    mes: '',
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                mes: action.data
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                mes: '',
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                mes: action.data
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                mes: ''
            }
        default:
            return state;
    }
}

export default authReducer