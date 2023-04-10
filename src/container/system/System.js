import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultis/path'



const System = () => {

    const { isLoggedIn } = useSelector(state => state.auth)


    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div>
            <Outlet />

        </div>
    )
}

export default System