import { Context } from '../../main'
import React, { useContext } from 'react'

const MyApps = () => {

    const { apps } = useContext(Context)

    return (
        <section id="skills" className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] gap-16 flex flex-col justify-center items-center w-full pt-[2rem] pb-[4rem]'>
            <div>
                <h1 className='text-3xl md:text-5xl font-bold uppercase text-white text-center font-semibold tracking-wider dancing-script text-tubeLight-effect'>my apps</h1>
            </div>
            <div className='grid grid-cols-2 xl:grid-cols-7 gap-6'>
                {
                    apps && apps.map((curVal) => {
                        return (
                            <div key={curVal._id} className='w-28 bg-[#EDF2F8] h-28 px-6 py-2 flex flex-col hover:rotate-45 duration-200 gap-2 justify-center items-center rounded-full'>
                                <img src={curVal.svg && curVal.svg.url} className='w-10 mx-auto rounded-full hover:rotate-45 duration-200' alt="app svg" />
                                <p className='text-slate-800 text-[0.6rem] font-bold text-center uppercase'>{curVal.name}</p>
                            </div>
                        )
                    })
                }

            </div>
            <div className='flex flex-col gap-1 justify-end w-full items-end'>
                <p className='text-xs'>@2024 TUSHAR</p>
                <p className='text-xs'>All rights reserved</p>
            </div>
        </section>
    )
}

export default MyApps
