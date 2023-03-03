import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { sidebarMenu } from '../ultis/menu';


const notActiveStyle = 'px-[25px] py-2 font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center';
const activeStyle = 'px-[25px] py-2 font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center';

const sidebarLeft = () => {
    return (
        <div className='flex flex-col'>
            <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center'>
                <img src={logo} alt="logo" className='w-[120px] h-10' />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        end={item.end}
                        className={({ isActive }) => isActive ? activeStyle : notActiveStyle}

                    >
                        {item.icon} <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default sidebarLeft