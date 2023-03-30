import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight, Player } from '../../components/index';


const Public = () => {
    return (
        <div className='w-full min-h-screen  flex flex-col bg-main-300 '>
            <div className=' flex w-full h-full flex-auto '>
                <div className='w-[240px] flex-none border border-blue-500 '>
                    <SidebarLeft />
                </div>
                <div className='flex-auto border border-red-500 '>
                    <Outlet />
                </div>
                <div className='w-[329px] flex-none border border-blue-500  '  >
                    <SidebarRight />
                </div>
            </div>
            <div className='flex-none h-[90px] ' >
                <Player />
            </div>
        </div>

    )
}

export default Public