import React, { useEffect, useState } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux';
import { SongItem } from './'
import * as apis from '../api'
import Scrollbars from 'react-custom-scrollbars-2';

const { BsTrash } = icons;

export const SidebarRight = () => {

    const [isRecent, setIsRecent] = useState(false);
    const { curSongData, curSongId, curAlbumId, isPlaying, recentSongs } = useSelector(state => state.music);
    const [playlist, setPlaylist] = useState(null)
    useEffect(() => {

        curAlbumId && fetchDetailPlaylist()

    }, [])

    const fetchDetailPlaylist = async () => {
        const response = await apis.apiGetDetailPlaylist(curAlbumId)
        if (response?.data?.err === 0) {
            setPlaylist(response?.data?.data?.song?.items)
        }

    }

    useEffect(() => {
        if (curAlbumId && isPlaying) {
            fetchDetailPlaylist()
        }
    }, [curAlbumId, isPlaying])

    useEffect(() => {
        if (isPlaying) {
            setIsRecent(false)
        }
    }, [curSongId])

    return (
        <div className='flex flex-col text-xs w-full h-full'>
            <div className='h-[70px] flex-none py-[14px] w-full gap-8 flex items-center justify-between'>
                <div className='flex flex-auto bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[6px] ${!isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}>
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[6px] ${isRecent && 'bg-main-100'} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}>
                        Nghe gần đây

                    </span>

                </div>
                <span className='p-1 rounded-full bg-main-100 cursor-pointer'><BsTrash size={16} /></span>
            </div>
            {isRecent ?
                <div className='w-full flex flex-auto flex-col'>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {recentSongs && <div className='flex flex-col '>
                            {
                                recentSongs?.map(item => (
                                    <SongItem
                                        key={item.sid}
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artistsNames}
                                        sid={item.sid}
                                    />
                                ))}

                        </div>}
                    </Scrollbars>
                </div>
                :
                <div className='w-full flex flex-auto flex-col'>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        <SongItem
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artists={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            sm={true}
                            style='bg-main-500 text-white'

                        />
                        <div className='text-black flex flex-col pt-[15px] px-2 pb-[5px]'>
                            <span className=' text-sm font-bold'>Tiếp theo</span>
                            <span className='opacity-70 text-xs flex gap-1'>
                                <span>Từ playlist</span>
                                <span className='font-medium text-main-500'>{curSongData?.album?.title.length > 30 ? `${curSongData?.album?.title?.slice(0, 30)}...` : curSongData?.album?.title}</span>
                            </span>
                        </div>
                        {playlist && <div className='flex flex-col '>

                            {playlist?.map(item => (

                                <SongItem
                                    key={item?.encodeId}
                                    thumbnail={item?.thumbnail}
                                    title={item?.title}
                                    artists={item?.artistsNames}
                                    sid={item?.encodeId}
                                />
                            ))}

                        </div>}
                    </Scrollbars>
                </div>
            }
            <div className='w-full h-[90px]'>

            </div>
        </div>
    )
}
export default SidebarRight
