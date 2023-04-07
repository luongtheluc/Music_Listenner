import React, { memo } from 'react'

const InputFrom = ({ label, type, value, setValue }) => {
    return (
        <div>
            <label className='text-sm text-gray-600'>{label}</label>
            <input type={`${type}`}
                className='outline-none bg-[#dee3e4] p-2 rounded-md w-full'
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
            />
        </div>
    )
}

export default memo(InputFrom)