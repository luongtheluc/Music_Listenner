import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight, Player, Header } from '../../components/index';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Public = () => {

    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)

    return (
        <div className='w-full relative h-screen  flex flex-col bg-main-300 '>
            <div className=' flex w-full h-full flex-auto '>
                <div className='w-[240px] h-full  flex-none border '>
                    <SidebarLeft />
                </div>
                <div className='flex-auto flex flex-col '>
                    <div className='h-[70px] px-[59px] flex-none flex items-center '>
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSidebar && <div className='w-[329px] hidden 1600:flex flex-none animate-slide-left h-screen '  >
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