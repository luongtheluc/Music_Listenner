import axiosConfig from '../Axios';



export const apiRegister = (payload) => new Promise(async (reslove, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'user/register',
            data: payload
        })
        reslove(response)
    } catch (error) {
        reject(error)
    }
})

export const apiLogin = (payload) => new Promise(async (reslove, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'user/login',
            data: payload
        })
        reslove(response)
    } catch (error) {
        reject(error)
    }
})