import React, { useEffect, useState } from 'react'
import TopBar from './sub-components/Topbar'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewSkill, clearAllSkillErrors, resetSkillsSlice } from '../redux/Slices/skillSlice'
import LoadingButton from './sub-components/LoadingButton'

const Skills = () => {

  const dispatch = useDispatch()
  const { message, loading, error } = useSelector((state) => state.skill)
  const [title, setTitle] = useState("")
  const [proficiency, setProficiency] = useState("")
  const [SVG, setSVG] = useState("")
  const [SVGPreview, setSVGPreview] = useState("")
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllSkillErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetSkillsSlice())
    }
  }, [message, loading, dispatch, error])

  const uploadSVGHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setSVG(file)
      setSVGPreview(reader.result)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('proficiency', proficiency)
    formData.append('svg', SVG)

    dispatch(addNewSkill(formData))

    setTitle("")
    setProficiency("")
  }

  return (
    <>
      <TopBar />
      <div className='flex flex-col justify-center items-center gap-8 h-screen'>
        <div>
          <h1 className='uppercase text-sm md:text-xl font-semibold leading-7 tracking-wider'>add a new skill</h1>
        </div>
        <form className='w-full pl-0 pr-0 xl:pl-[14rem] xl:pr-[14rem]'>
          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Title</label>
            <div className="mt-2">
              <input type="text" name="street-address" value = {title} onChange={(e) => setTitle(e.target.value)} placeholder='title' id="street-address" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="col-span-full mt-4">
            <label htmlFor="street-address" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Proficiency</label>
            <div className="mt-2">
              <input type="number" name="street-address" value = {proficiency} onChange={(e) => setProficiency(e.target.value)} placeholder='proficiency' id="street-address" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="col-span-full mt-4">
            <label htmlFor="cover-photo" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Skill SVG</label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
            {
              SVGPreview ? <img src={SVGPreview} alt="SVG Preview" className="w-12 mx-auto" /> : (
                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
              )
            }
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span className='text-xs md:text-sm'>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadSVGHandler}/>
                  </label>
                  <p className="pl-1 text-xs md:text-sm">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            {
              loading
                ?
                <LoadingButton content={"Adding..."} width={"w-full"}/>
                :
                <Button onClick={submitHandler} className="w-full text-xs md:text-sm">Add Skill</Button>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default Skills
