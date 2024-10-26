import { Link } from 'react-router-dom'
import { Context } from '../../main'
import React, { useContext } from 'react'

const Projects = () => {

  const { projects } = useContext(Context)

  return (
    <section className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] flex flex-col justify-center items-center pt-[2rem] pb-[4rem] gap-4'>
      <div>
        <h1 className='text-3xl md:text-5xl flex gap-4 font-bold uppercase text-white text-center font-semibold tracking-wider'>my <span className="text-tubeLight-effect">portfolio</span></h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {
          projects && projects.map((curVal) => {
            return (
              <Link key={curVal._id} to={`/viewProject/${curVal._id}`}><img src={curVal.projectBanner && curVal.projectBanner.url} className='md:hover:scale-110 md:duration-150  cursor-pointer' alt="project_banner" /></Link>
            )
          })
        }
      </div>
      <div className='flex flex-col gap-1 justify-end w-full items-end mt-8'>
        <p className='text-xs'>@2024 TUSHAR</p>
        <p className='text-xs'>All rights reserved</p>
      </div>
    </section>
  )
}

export default Projects
