import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, onclick, fullwidth }) => {
    return (
        <div>
            <button
                type='button'
                onClick={onclick}
                className={`${textColor} ${bgColor} 
                    hover:underline flex items-center justify-center gap-1 
                    outline-none rounded-3xl px-4 py-2 ${fullwidth && 'w-full'}`}>
                {text}
            </button>
        </div>
    )
}

export default memo(Button)