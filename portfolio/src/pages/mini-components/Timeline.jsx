import { Context } from '../../main'
import React, { useContext } from 'react'

const Timeline = () => {

    const { timelines } = useContext(Context)

    return (
        <div className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] pt-[4rem] pb-[2rem] flex flex-col gap-6'>
            <h1 className='text-2xl md:text-4xl font-bold text-tubeLight-effect'>Timeline</h1>
            <div>

                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {
                        timelines && timelines.map((curVal) => {
                            return (
                                <li className="mb-10 ms-6" key = {curVal._id}>
                                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                        <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </span>
                                    <h3 className="flex items-center mb-1 text-sm md:text-md font-semibold text-gray-900 dark:text-white capitalize">{curVal.title}</h3>
                                    <time className="block mb-2 text-xs font-normal leading-none text-gray-400 dark:text-gray-500 capitalize">{curVal.timeline && curVal.timeline.from} - {curVal.timeline && curVal.timeline.to}</time>
                                    <p className="mb-4 text-xs md:text-[0.8rem] md:text-sm text-gray-500 dark:text-gray-400 capitalize">{curVal.description}</p>
                                </li>
                            )
                        })
                    }
                </ol>


            </div>
        </div>
    )
}

export default Timeline
