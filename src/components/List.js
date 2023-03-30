import moment from 'moment'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import icons from '../ultis/icons'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons



const List = ({ songData }) => {

    const dispatch = useDispatch()

    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.play(true))
            }}
            className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#dfe3e3]'>
            <div className='flex items-center gap-3 flex-1'>
                <span>
                    <BsMusicNoteBeamed />
                </span>
                <img src={songData.thumbnail} alt="thumbnail" className='w-10 h-10 object-cover rounded-md cursor-pointer' />
                <span className='flex flex-col w-full'>
                    <span className='text-sm font-semibold'>
                        {songData?.title?.length > 20 ? `${songData?.title?.slice(0, 20)}...` : songData?.title}
                    </span>
                    <span className='cursor-pointer'>
                        {songData?.artistsNames}
                    </span>
                </span>
            </div>
            <div className='flex justify-center items-center flex-1 cursor-pointer'>
                {songData?.album?.title?.length > 20 ? `${songData?.album?.title?.slice(0, 20)}...` : songData?.album?.title}
            </div>
            <div className='flex-1 flex justify-end'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default memo(List)