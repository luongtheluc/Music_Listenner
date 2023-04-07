import React, { useEffect, useState } from 'react'
import { InputFrom, Button } from '../../components'
import { useLocation } from 'react-router-dom'
import { apiRegister } from '../../api'

export const Login = () => {

    const location = useLocation();
    const [isRegister, setIsRegister] = useState(location.state)
    const [payload, setPayload] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        password: '',
    })
    useEffect(() => {
        setIsRegister(location.state)
    }, [location.state])

    const handleSubmit = async () => {
        const response = await apiRegister(payload);
        console.log(response)
    }


    return (
        <div className='flex max-h-screen items-center justify-center pt-[100px] w-full'>
            <div >
                <div className='bg-white max-w-[800px] p-[30px] pb-[100px] rounded-md shadow-md'>
                    <h3 className='text-gray-600 font-semibold text-2xl flex items-center justify-center '>{!isRegister ? 'LOGIN' : 'SIGN UP'}</h3>
                    <hr />
                    <div className='flex flex-col gap-4'>
                        <div className='w-full pt-2 flex flex-col gap-2'>
                            {isRegister && <InputFrom type={'text'} label={'firstname'} value={payload.firstname} setValue={setPayload} />}
                            {isRegister && <InputFrom type={'text'} label={'lastname'} value={payload.lastname} setValue={setPayload} />}
                            <InputFrom type={'email'} label={'Email'} value={payload.email} setValue={setPayload} />
                            <InputFrom type={'phone'} label={'Phone'} value={payload.mobile} setValue={setPayload} />
                            <InputFrom type={'password'} label={'Password'} value={payload.password} setValue={setPayload} />
                        </div>
                        <div className='w-full flex items-center justify-center'>
                            <Button
                                onClick={handleSubmit}
                                text={!isRegister ? 'LOGIN' : 'SIGN UP'}
                                fullwidth={true}
                                textColor={'text-white'}
                                bgColor={'bg-[#35767f]'} />
                        </div>
                        <hr />
                        <div className='flex flex-col items-center justify-center'>
                            {isRegister ? <small>Bạn đã có tài khoản? <span
                                className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => { setIsRegister(false) }}>Đăng nhập ngay</span></small> :
                                <>
                                    <small className='text-blue-500 hover:text-red-700 cursor-pointer'>
                                        Bạn quên mật khẩu
                                    </small>
                                    <small
                                        onClick={() => { setIsRegister(true) }}
                                        className='text-blue-500 hover:text-red-700 cursor-pointer'>
                                        Tạo tài khoản mới
                                    </small>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;