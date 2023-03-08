import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getArrSlider } from '../ultis/fn'


const Slider = () => {
    const { banner } = useSelector(state => state.app);

    useEffect(() => {
        let min = 0;
        let max = 2;
        const sliderElements = document.getElementsByClassName('slider-items');
        //
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderElements.length - 1)
            for (let i = 0; i < sliderElements.length; i++) {
                //xoa classname da css
                sliderElements[i].classList.remove('animate-slide-right', 'order-last', 'z-20')
                sliderElements[i].classList.remove('animate-slide-left', 'order-first', 'z-10')
                sliderElements[i].classList.remove('animate-slide-left2', 'order-2', 'z-10')
                // Hide or Show images
                if (list.some(item => item === i)) {
                    sliderElements[i].style.cssText = `display: block`
                } else {
                    sliderElements[i].style.cssText = `display: none`
                }
            }
            list.forEach(item => {
                if (item === max) {
                    sliderElements[item].classList.add('animate-slide-right', 'order-last', 'z-20')
                }
                else {
                    if (item === min) {
                        sliderElements[item].classList.add('animate-slide-left', 'order-first', 'z-10')
                    }
                    else {
                        sliderElements[item].classList.add('animate-slide-left2', 'order-2', 'z-10')
                    }
                }
            })
            if (min === sliderElements.length - 1) {
                min = 0
            }
            else {
                min += 1;
            }
            if (max === sliderElements.length - 1) {
                max = 0
            }
            else {
                max += 1;
            }

            console.log(list)

        }, 3000)
        return () => {
            intervalId && clearInterval(intervalId)
        }

    }, [])

    return (
        <div className='w-full h-[50%] overflow-hidden px-[59px]'>
            <div className='flex w-full gap-4  pt-8'>
                {banner?.map((item, index) => (
                    <img
                        alt='slider'
                        key={item.encodeId}
                        src={item.banner}
                        className={`slider-items flex-1 object-contain w-1/3 rounded-lg ${index <= 2 ? 'block' : 'hidden'}`} />
                ))}
            </div>
        </div>
    )
}

export default Slider