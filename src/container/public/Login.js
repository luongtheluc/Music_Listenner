import React, { useEffect, useState } from 'react'
import { InputFrom, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import path from '../../ultis/path'


export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [isRegister, setIsRegister] = useState(location.state)
    const [payload, setPayload] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        password: '',
    })

    const { isLoggedIn } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const [invalidField, setInvalidField] = useState([])

    useEffect(() => {
        setIsRegister(location.state)
    }, [location.state])
    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/')
        }

    }, [isLoggedIn])
    const handleSubmit = async () => {
        let findPayload = isRegister ? payload : {
            mobile: payload.mobile,
            email: payload.email,
            password: payload.password
        }
        let checkInvalids = validate(findPayload)

        if (checkInvalids === 0) {
            isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
        }

    }
    console.log(invalidField)
    const validate = (payload) => {
        let invalidCount = 0;
        let feilds = Object.entries(payload);
        console.log(feilds)
        feilds.forEach(item => {
            if (item[1] === '') {
                setInvalidField(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được để trống trường này ',
                }])
                invalidCount++;
                console.log("Count: 1 " + invalidCount)
            }
        })
        feilds.forEach(item => {
            console.log(item)
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidField(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải tối thiểu 6 ký tự',
                        }])
                        invalidCount++;
                    }
                    break;
                case 'mobile':
                    if (!+item[1]) {
                        setInvalidField(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ',
                        }])
                        invalidCount++;
                    }
                    break;
                default:
                    break;
            }
        })
        return invalidCount;

    }


    return (
        <div className='flex max-h-screen items-center justify-center pt-[100px] w-full'>
            <div >
                <div className='bg-white max-w-[800px] p-[30px] pb-[100px] rounded-md shadow-md'>
                    <h3 className='text-gray-600 font-semibold text-2xl flex items-center justify-center '>{!isRegister ? 'LOGIN' : 'SIGN UP'}</h3>
                    <hr />
                    <div className='flex flex-col gap-4'>
                        <div className='w-full pt-2 flex flex-col gap-2'>
                            {isRegister && <InputFrom setInvalidField={setInvalidField} invalidFields={invalidField} type={'firstname'} label={'firstname'} value={payload.firstname} setValue={setPayload} />}
                            {isRegister && <InputFrom setInvalidField={setInvalidField} invalidFields={invalidField} type={'lastname'} label={'lastname'} value={payload.lastname} setValue={setPayload} />}
                            <InputFrom setInvalidField={setInvalidField} invalidFields={invalidField} type={'email'} label={'Email'} value={payload.email} setValue={setPayload} />
                            <InputFrom setInvalidField={setInvalidField} invalidFields={invalidField} type={'mobile'} label={'Phone'} value={payload.mobile} setValue={setPayload} />
                            <InputFrom setInvalidField={setInvalidField} invalidFields={invalidField} type={'password'} label={'Password'} value={payload.password} setValue={setPayload} />
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
                                onClick={() => {
                                    setIsRegister(false);
                                    setPayload({
                                        firstname: '',
                                        lastname: '',
                                        email: '',
                                        mobile: '',
                                        password: '',
                                    })
                                }}>Đăng nhập ngay</span></small> :
                                <>
                                    <small className='text-blue-500 hover:text-red-700 cursor-pointer'>
                                        Bạn quên mật khẩu
                                    </small>
                                    <small
                                        onClick={() => {
                                            setIsRegister(true);
                                            setPayload({
                                                firstname: '',
                                                lastname: '',
                                                email: '',
                                                mobile: '',
                                                password: '',
                                            })
                                        }}
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