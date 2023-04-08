import actionTypes from "./actionTypes";
import * as apis from '../../api'



export const register = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiRegister(payload)
        console.log(response)
        if (response?.data?.success) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        }
        else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.mes
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER,
            data: null,
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiLogin(payload)
        console.log(response)
        if (response?.data?.success) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        }
        else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.mes
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null,
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})