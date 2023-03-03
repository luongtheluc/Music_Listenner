import React from 'react';
import { Header } from '../../components/index'
import * as apis from '../../api';
import { useEffect } from 'react';



const Home = () => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await apis.getHome();
            console.log(response);
        }
        fetchData();


    }, [])

    return (
        <div className='overflow-y-auto '>
            <div className='h-[70px] px-[59px] flex items-center '>
                <Header />
            </div>
        </div>
    )
}

export default Home