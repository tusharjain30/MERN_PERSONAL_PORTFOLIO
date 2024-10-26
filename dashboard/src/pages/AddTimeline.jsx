import React, { useEffect, useState } from 'react'
import TopBar from './sub-components/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewTimeline, clearAllTimelineErrors, resetTimelinesSlice } from '../redux/Slices/timelineSlices'
import LoadingButton from './sub-components/LoadingButton'

const Timeline = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")  
  const [from, setFrom] = useState("")  
  const [to, setTo] = useState("")  
  const {loading, message, error} = useSelector((state) => state.timeline)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addNewTimeline({title, description, from, to}))
    setTitle("")
    setDescription("")
    setFrom("")
    setFrom("")
  }

  useEffect(() => {

    if(error){
      toast.error(error)
      dispatch(clearAllTimelineErrors())
    }

    if(message){
      toast.success(message)
      dispatch(resetTimelinesSlice())
    }

  }, [dispatch, message, error, loading])

  return (
    <>
      <TopBar />
      <form className='pl-0 pr-0 xl:pl-[14rem] xl:pr-[14rem] pb-4 h-screen'>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 uppercase pt-[2rem] sm:pt-[4rem] text-sm md:text-xl tracking-wider">add new timeline</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Title</label>
                <div className="mt-2">
                  <input type="text" name="username" value={title} onChange={(e) => setTitle(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='title' />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Description</label>
                <div className="mt-2">
                  <textarea id="about" name="about" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6 pl-2" placeholder="Description"></textarea>
                </div>
            
              </div>

              <div className="sm:col-span-full">
                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Starting Point (From)</label>
                <div className="mt-2">
                  <input type="text" name="username" value={from} onChange={(e) => setFrom(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='from' />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Ending Point (To)</label>
                <div className="mt-2">
                  <input type="text" name="username" value={to} onChange={(e) => setTo(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='to' />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {
            loading ? <LoadingButton content={"Adding..."} width = {"w-full"}/> : (
              <button type="submit" onClick={submitHandler} className="w-full rounded-md bg-indigo-600 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Timeline</button>
            )
          }
        </div>
      </form >
    </>
  )
}

export default Timeline
