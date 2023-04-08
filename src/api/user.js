import axiosConfig from '../Axios';

export const apiGetCurrent = () => new Promise(async (reslove, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'user/current',

        })
        reslove(response)
    } catch (error) {
        reject(error)
    }
})