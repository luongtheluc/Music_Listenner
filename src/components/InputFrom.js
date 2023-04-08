import React, { memo } from 'react'

const InputFrom = ({ label, type, value, setValue, invalidFields, setInvalidField }) => {
    return (
        <div>
            <label className='text-sm text-gray-600'>{label}</label>
            <input
                className='outline-none bg-[#dee3e4] p-2 rounded-md w-full'
                value={value}
                onChange={(e) => {
                    setValue(prev => ({ ...prev, [type]: e.target.value }))
                }}
                onFocus={() => setInvalidField([])}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === type) && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === type)?.message}</small>}
        </div>
    )
}

export default memo(InputFrom)