import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight, Player, Header } from '../../components/index';


const Public = () => {

    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)

    return (
        <div className='w-full relative h-screen  flex flex-col bg-main-300 '>
            <div className=' flex w-full h-full flex-auto '>
                <div className='w-[240px] h-full  flex-none border '>
                    <SidebarLeft />
                </div>
                <div className='flex-auto '>
                    <div className='h-[70px] px-[59px] flex items-center '>
                        <Header />

                    </div>
                    <Outlet />
                    <div className='w-full h-[500px]'>

                    </div>
                </div>
                {isShowRightSidebar && <div className='w-[329px] hidden 1600:flex flex-none animate-slide-left '  >
                    <SidebarRight />
                </div>}

            </div>
            <div className='fixed bottom-0 left-0 right-0 h-[90px] ' >
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>

    )
}

export default Public