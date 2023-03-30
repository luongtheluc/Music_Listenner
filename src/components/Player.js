import React from 'react'

const Player = () => {
    return (
        <div className='bg-main-400 px-5 h-full flex'>
            <div className='w-[30%] flex-auto'>Details song</div>
            <div className='w-[40%] flex-auto'>Main player</div>
            <div className='w-[30%] flex-auto'> Volume</div>
        </div>
    )
}

export default Player; 