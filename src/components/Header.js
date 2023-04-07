import React, { useCallback } from 'react'
import Icons from '../ultis/icons'
import Search from './Search';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import path from '../ultis/path';

const { HiArrowNarrowRight, HiArrowNarrowLeft } = Icons;

const Header = () => {

    const navigate = useNavigate()
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: flag })
    }, [])

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
                <Button text={'Đăng nhập'} textColor={'text-white'} bgColor={'bg-[#35767f]'} onclick={() => goLogin(false)} />
                <Button text={'Đăng ký'} textColor={'text-white'} bgColor={'bg-[#35767f]'} onclick={() => goLogin(true)} />
            </div>
        </div>
    )
}

export default Header