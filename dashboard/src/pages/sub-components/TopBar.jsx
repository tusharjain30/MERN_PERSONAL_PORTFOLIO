import React from 'react'
import { useSelector } from 'react-redux'

const TopBar = () => {

    const { user } = useSelector((state) => state.user)

    return (
        <div>
            <hr className='leading-[8px] mb-2 sm:hidden'></hr>
            <div className='flex items-center gap-4 justify-start'>
                <img src={user && user.avatar && user.avatar.url} alt='profile' className='rounded-full w-14 h-14' />
                <h1 className='capitalize tracking-[1px] text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold'>welcome back, {user && user.fullName}</h1>
            </div>
        </div>
    )
}

export default TopBar
