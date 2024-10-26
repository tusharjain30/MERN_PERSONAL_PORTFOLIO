import { Context } from '../../main'
import React, { useContext } from 'react'

const AboutMe = () => {

  const { user } = useContext(Context)

  return (
    <div className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] pt-[2rem] pb-[2rem] flex flex-col gap-4 justify-center items-center w-full'>
      <h1 className='text-2xl md:text-4xl font-bold uppercase text-center flex gap-4'><span className='text-tubeLight-effect'>about</span>me</h1>
      <p className="mb-4 text-[0.6rem] md:text-xs text-gray-500 dark:text-gray-400 uppercase">allow me to introduce myself.</p>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-14 pt-4'>
        <div className='flex justify-center'>
          <img src={user && user.avatar && user.avatar.url} className='w-[350px] h-auto md:w-[400px] border border-8 border-black rotate-12' alt="myPic" />
        </div>
        <p className='text-justify leading-7 md:leading-7 tracking-[0.7px] text-xs capitalize'>{user && user.aboutMe}</p>
      </div>
      <div className='flex flex-col gap-1 justify-end w-full items-end'>
        <p className='text-xs'>@2024 TUSHAR</p>
        <p className='text-xs'>All rights reserved</p>
      </div>
    </div>
  )
}

export default AboutMe
