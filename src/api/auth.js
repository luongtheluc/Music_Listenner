import axiosConfig from '../Axios';



export const apiRegister = (payload) => new Promise(async (reslove, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/user/register',
            data: payload
        })
        reslove(response)
        console.log(response)
    } catch (error) {
        reject(error)
    }
})