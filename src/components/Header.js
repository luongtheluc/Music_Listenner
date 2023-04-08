import React, { useCallback } from 'react'
import Icons from '../ultis/icons'
import Search from './Search';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import path from '../ultis/path';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
const { HiArrowNarrowRight, HiArrowNarrowLeft, BsFillGearFill } = Icons;

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: flag })
    }, [])

    const { isLoggedIn } = useSelector(state => state.auth)


    return (
        <div className='flex justify-between w-full items-center '>
            <div className='flex gap-6 items-center w-full'>
                <div className='flex gap-6 text-gray-400'>
                    <span><HiArrowNarrowLeft size={24} /></span>
                    <span><HiArrowNarrowRight size={24} /></span>
                </div>
                <div className='w-1/2'>
                    <Search />
                </div>
            </div>
            <div className='w-full flex justify-end items-center gap-4'>
                {!isLoggedIn ? <>
                    <Button text={'Đăng nhập'} textColor={'text-white'} bgColor={'bg-[#35767f]'} onClick={() => goLogin(false)} />
                    <Button text={'Đăng ký'} textColor={'text-white'} bgColor={'bg-[#35767f]'} onClick={() => goLogin(true)} />
                </> :
                    <div className='w-full flex items-center justify-end relative gap-6'>
                        <BsFillGearFill size={30} />
                        <Button text={'Đăng xuất'} textColor={'text-white'} bgColor={'bg-[#35767f]'} onClick={() => {
                            dispatch(actions.logout())
                        }} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Header