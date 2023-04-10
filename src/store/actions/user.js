import actionTypes from "./actionTypes";
import * as apis from '../../api'

export const getCurrentAction = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCurrent()
        if (response?.data?.success) {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: response.data.result,
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_CURRENT,
                currentData: null,
                mes: response.data.result
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CURRENT,
            currentData: null,
            mes: error
        })
    }
}