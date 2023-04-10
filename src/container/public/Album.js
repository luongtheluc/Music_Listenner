import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useParams } from 'react-router-dom'
import * as apis from '../../api'
import Lists from '../../components/Lists'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { AudioLoading } from '../../components'
import icons from '../../ultis/icons'



const { BsFillPlayFill } = icons

const Album = () => {

    const { pid } = useParams()

    const [playlistData, setplaylistData] = useState({})
    const dispatch = useDispatch()
    const { isPlaying } = useSelector(state => state.music)

    useEffect(() => {
        dispatch(actions.setCurAlbumId(pid))
        const fetchDetailPlaylist = async () => {
            const response = await apis.apiGetDetailPlaylist(pid);

            if (response?.data.err === 0) {

                setplaylistData(response?.data?.data)
                dispatch(actions.setPlaylists(response?.data?.data?.song?.items))
            }
        }
        fetchDetailPlaylist()
    }, [pid])

    return (
        <div className='flex gap-8 w-full h-[80%] px-[59px]'>
            <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
                <div className='w-full relative overflow-hidden'>
                    <img
                        src={playlistData?.thumbnailM}
                        alt="thumbnailM"
                        className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : ' animate-rotate-center-pause rounded-md'} shadow-md`}
                    />
                    <div
                        className={`${isPlaying ? 'rounded-full' : ''} absolute top-0 left-0 bottom-0 right-0
                        hover:bg-overlay-30 text-white flex items-center justify-center hover:cursor-pointer`}>
                        <span className='p-3 border border-white rounded-full'>
                            {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <h3 className='text-[20px] font-bold text-gray-700'>{playlistData?.title}</h3>
                    <span className='flex gap-2 items-center text-gray-500 text-xs'>
                        <span>
                            Cập nhật:
                        </span>
                        <span>
                            {moment.unix(playlistData?.contentLastUpdate).format('DD/MM/YYYY')}
                        </span>
                    </span>
                    <span className='flex gap-2 items-center text-gray-500 text-xs' >
                        {playlistData.artistsNames}
                    </span>
                    <span className='flex gap-2 items-center text-gray-500 text-xs'>
                        {`${Math.floor(playlistData.like / 1000)}K người yêu thích`}
                    </span>
                </div>
            </div>
            <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                <div className='flex-auto mb-[40px]'>
                    <span className='text-sm'>
                        <span className='text-gray-600'>Lời tựa </span>
                        <span>{playlistData?.sortDescription}</span>
                    </span>

                    <Lists totalDuration={playlistData?.song?.totalDuration} />

                </div>
            </Scrollbars>
        </div>

    )
}

export default Album