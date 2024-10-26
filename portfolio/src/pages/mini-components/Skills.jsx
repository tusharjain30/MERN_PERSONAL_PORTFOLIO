import { Context } from '../../main'
import React, { useContext } from 'react'

const Skills = () => {

    const { skills } = useContext(Context)

    return (
        <section id="skills" className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] gap-16 flex flex-col justify-center items-center w-full pt-[4rem] pb-[4rem]'>
            <div>
                <h1 className='text-3xl md:text-5xl font-bold uppercase text-white text-center font-semibold tracking-[4px] dancing-script text-tubeLight-effect'>skills</h1>
            </div>
            <div className='grid grid-cols-2 xl:grid-cols-7 gap-6'>
                {
                    skills && skills.map((curVal) => {
                        return (
                            <div key={curVal._id} className='bg-[#EDF2F8] flex flex-col hover:rotate-45 duration-200 gap-4 items-center justify-center pl-6 pr-6 pt-2 pb-2 rounded-lg'>
                                <img src={curVal.svg && curVal.svg.url} className='w-10 mx-auto rounded-full hover:rotate-45 duration-200' alt="skill svg" />
                                <p className='text-slate-800 text-[0.6rem] text-center uppercase font-bold'>{curVal.title}</p>
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

export default Skills
