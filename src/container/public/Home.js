import React, { memo } from 'react';
import { Slider, Section } from '../../components/index'


const Home = () => {
    return (
        <div className='overflow-y-auto w-full '>
            <Slider />
            <Section />
        </div>
    )
}

export default Home