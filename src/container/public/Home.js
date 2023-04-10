import React, { memo } from 'react';
import { Slider, Section } from '../../components/index'
import { useSelector } from 'react-redux';


const Home = () => {

    const { friday } = useSelector(state => state.app)


    return (
        <div className='overflow-y-auto w-full '>
            <Slider />
            <Section data={friday} />
        </div>
    )
}

export default Home