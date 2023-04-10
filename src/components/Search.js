import React, { useEffect, useState } from 'react'
import * as actions from '../store/actions';
import Icons from '../ultis/icons'
import { useDispatch } from 'react-redux'
import { useNavigate, createSearchParams } from 'react-router-dom'
import path from '../ultis/path';




const { FiSearch } = Icons;



const Search = () => {

    const [keyword, setKeyword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {

    //     window.addEventListener('keyup', handleSearch)

    //     return () => {
    //         window.removeEventListener('keyup', handleSearch)
    //     }
    // }, [])

    const handleSearch = async (e) => {
        if (e.keyCode === 13) {
            dispatch(actions.search(keyword));
            navigate({
                pathname: `/${path.SEARCH}/${path.SEARCH_ALL}`,
                search: createSearchParams({
                    q: keyword
                }).toString()
            })

        }
    }
    return (
        <div className='w-full flex items-center'>
            <span className='h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px] text-gray-600'>
                <FiSearch size={24} />
            </span>
            <input
                onChange={(e) => {
                    setKeyword(e.target.value)
                }}
                onKeyUp={handleSearch}
                type="text"
                className='outline-none px-4 bg-[#DDE4E4] w-full py-2 rounded-r-[20px] h-10 text-gray-600'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát,...' />
        </div>
    )
}

export default Search