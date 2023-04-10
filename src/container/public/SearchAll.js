import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../ultis/fn'
import { SongItem, List, SectionItem } from '../../components/'

const SearchAll = () => {

    const { searchData } = useSelector(state => state.music)
    return (
        <div className=' w-full flex px-[60px] flex-col gap-[60px]'>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold uppercase mb-5'>Nổi bật</h3>
                <div>
                    <div className='flex gap-8'>
                        {searchData?.top
                            &&
                            <>
                                <div className='flex bg-main-200 flex-1 rounded-md p-[10px] gap-8 items-center cursor-pointer'>
                                    <img className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' ? 'rounded-full' : ''}`} src={searchData?.top?.thumbnail} alt="avatar" />
                                    <div className='flex flex-col text-xs'>
                                        <span className='mb-[6px]'>{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                                        <span className='text-[14px] hover:underline font-semibold mb-[6px]'>{searchData?.top?.title || searchData?.top?.name}</span>
                                        {searchData?.top.objectType === 'artist' && <span>{handleNumber(searchData?.artists[0].totalFollow)} quan tâm</span>}
                                    </div>
                                </div>

                            </>}
                        {
                            searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(item => item === index))?.map(item => (

                                <div key={item?.encodeId} className='flex-1'>
                                    <SongItem
                                        thumbnail={item?.thumbnail}
                                        sid={item?.encodeId}
                                        title={item?.title}
                                        artists={item?.artistsNames}
                                        size={'w-[84px] h-[84px]'}
                                        style={'bg-main-200'}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col'>
                    <h3 className='text-lg font-bold mb-5'>Bài hát</h3>
                    <div className='flex justify-between flex-wrap'>
                        {searchData?.songs?.map((item, index) => (
                            <div
                                className={`flex-auto w-[45%] ${index % 2 === 0 ? 'pl-4' : 'pr-2'}`}
                                key={item.encodeId}>
                                <List isHideAlbum songData={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h3 className='text-lg font-bold mb-5'>Album</h3>
                    <div className='flex items-start justify-between gap-[28px]'>
                        {searchData?.playlists?.filter((item, index) => index <= 4)?.map((item) => (
                            <SectionItem
                                key={item.encodeId}
                                title={item.title}
                                link={item.link}
                                sortDescription={item.sortDescription}
                                thumbnailM={item.thumbnailM}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAll