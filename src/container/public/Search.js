import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col '>
                <div className='flex h-[50px] mb-7 text-sm border-b border-gray-400 pl-[60px]  py-1 items-center '>
                    <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
                    <div className='flex items-center'>
                        <span className='px-4 hover:text-main-500 cursor-pointer font-semibold uppercase'>Tất cả</span>
                        <span className='px-4 hover:text-main-500 cursor-pointer font-semibold uppercase'>Bài hát</span>
                        <span className='px-4 hover:text-main-500 cursor-pointer font-semibold uppercase'>Playlist</span>
                        <span className='px-4 hover:text-main-500 cursor-pointer font-semibold uppercase'>Album</span>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <Outlet />
            </div>
            <div className='w-full h-[120px]'></div>
        </div>
    )
}

export default Search