import { Context } from '../../main';
import React, { useContext } from 'react'
import { IoIosMail } from "react-icons/io";
import { IoIosPhonePortrait } from "react-icons/io";

const Footer = () => {

    const { user } = useContext(Context)

    return (
        <footer className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] flex flex-col justify-center items-center pt-[2rem] pb-[1rem] w-full'>
            <hr className='text-white w-full'></hr>
            <div className='pt-[2rem] pb-[1rem] flex flex-col gap-6 md:flex-row justify-between items-center w-full'>
                <div className='flex gap-2 items-center'>
                    <IoIosMail className='text-white' size="20" />
                    <p className='text-white text-xs font-semibold'>{user.email}</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <IoIosPhonePortrait className='text-white' size="20" />
                    <p className='text-white text-xs font-semibold'> +91 {user.phone}</p>
                </div>
                <p className='text-white text-xs font-semibold'>&copy; 2024 Tushar Jain. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
