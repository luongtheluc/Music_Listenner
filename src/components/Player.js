import React, { useEffect, useState, useRef } from 'react'
import { BiPlay } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../api'
import icons from '../ultis/icons';
import * as actions from '../store/actions'
import moment from 'moment';
import { toast } from 'react-toastify';


var intervalId
const { AiOutlineHeart, AiFillHeart, BsThreeDotsVertical, MdSkipNext, MdSkipPrevious, CiRepeat, BsFillPlayFill, BsPauseFill, CiShuffle } = icons;
const Player = () => {

    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [curSeconds, setCurSeconds] = useState(0)
    const [audio, setAudio] = useState(new Audio())
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()
    const [isShuffle, setIsShuffle] = useState(false)


    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            }
            else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSeconds(0)
                thumbRef.current.style.cssText = `right: ${100}%`;
            }
        }
        fetchDetailSong()
    }, [curSongId])


    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load();

        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                var percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSeconds(Math.round(audio.currentTime))
            }, 200);
        }
        console.log(audio)

    }, [audio])

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        }
        else {
            audio.play();
            dispatch(actions.play(true))
        }
    }

    const handleClickProgressbar = (e) => {
        const track = trackRef.current.getBoundingClientRect()
        const percentProgessbar = Math.round((e.clientX - track.left) * 10000 / track.width) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percentProgessbar}%`;
        audio.currentTime = (percentProgessbar / 100) * songInfo?.duration;
        setCurSeconds(Math.round((percentProgessbar / 100) * songInfo?.duration));

        console.log(percentProgessbar)

    }

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex
            songs.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                    console.log(currentSongIndex)
                }
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }

    }

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex
            songs.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index;
                }
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }

    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length)
    }


    return (
        <div className='bg-main-400 px-5 h-full flex '>
            <div className='w-[30%] flex-auto flex items-center gap-3'>
                <img src={songInfo?.thumbnail} alt="" className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col '>
                    <span className='font-semibold text-gray-700 text-sm'>
                        {songInfo?.title}
                    </span>
                    <span className='text-xs text-gray-500 '>
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className='flex gap-4 pl-[8px]'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDotsVertical size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex items-center justify-center gap-2 flex-col flex-auto py-2'>
                <div className='flex gap-8 justify-center items-center'>
                    <span
                        onClick={() => {
                            setIsShuffle(prev => !prev)
                        }}
                        className={`cursor-pointer ${isShuffle && 'text-purple-700'}`}
                        title='Bật phát ngẫu nhiên'>
                        <CiShuffle size={24} />
                    </span>
                    <span
                        className={`${!songs ? 'text-gray-500 ' : 'cursor-pointer'}`}
                        onClick={handlePrevSong}>
                        <MdSkipPrevious size={20} />
                    </span>
                    <span
                        onClick={handleTogglePlayMusic}
                        className='p-1 border border-gray-700 rounded-full hover:bg-main-500'>
                        {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
                    </span>
                    <span onClick={handleNextSong} className={`${!songs ? 'text-gray-500 ' : 'cursor-pointer'}`}>
                        <MdSkipNext size={20} />
                    </span>
                    <span
                        className='cursor-pointer'
                        title='Bật phát lại'>
                        <CiRepeat size={20} />
                    </span>
                </div>
                <div className='w-full flex items-center justify-center gap-3 text-xs'>
                    <span className=''>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div

                        onClick={handleClickProgressbar}
                        ref={trackRef}
                        className='w-3/5 h-[3px] hover:h-[6px] rounded-l-full rounded-r-full relative bg-[#b2c0c2] cursor-pointer'>
                        <div ref={thumbRef} className='absolute rounded-l-full rounded-r-full top-0 left-0 bottom-0  bg-[#417a7f]'>

                        </div>
                    </div>
                    <span className=''> {moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto'> Volume</div>
        </div>
    )
}

export default Player; 