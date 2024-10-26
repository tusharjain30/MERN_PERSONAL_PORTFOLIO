import { clearAllErrors, getAllProjects, getSingleProject, resetProjectSliceData, updateProject } from '@/redux/Slices/projectSlices'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingButton from './sub-components/LoadingButton'
import axios from 'axios'

const UpdateProject = () => {

    const { message, error, loading } = useSelector((state) => state.project)
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [technology, setTechnology] = useState("")
    const [stack, setStack] = useState("")
    const [deployed, setDeployed] = useState("")
    const [projectBanner, setProjectBanner] = useState("")
    const [projectBannerPreview, setProjectBannerPreview] = useState("")
    const [gitLink, setGitLink] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { id } = useParams()
    const {isAuthenticated} = useSelector((state) => state.user)
    const navigateTo = useNavigate()

    useEffect(() => {

        if(!isAuthenticated){
            navigateTo('/login')
        }


        const getProject = async () => {
            try {

                const { data } = await axios.get(`http://localhost:4000/api/v1/project/getSingleProject/${id}`, {
                    withCredentials: true
                })

                setProjectName(data.project.title)
                setDescription(data.project.description)
                setTechnology(data.project.technologies)
                setStack(data.project.stack)
                setDeployed(data.project.deployed)
                setProjectBannerPreview(data.project.projectBanner && data.project.projectBanner.url)
                setProjectBanner(data.project.projectBanner && data.project.projectBanner.url)
                setGitLink(data.project.githubRepo)
                setProjectLink(data.project.deployedLink)

            } catch (err) {
                toast.error(err.response.data.message)
            }
        }
        getProject()
    }, [])

    useEffect(() => {
        dispatch(getSingleProject(id))
        if (error) {
            toast.error(error)
            dispatch(clearAllErrors())
        }

        if (message) {
            toast.success(message)
            setIsLoading(false)
            dispatch(resetProjectSliceData())
            dispatch(getAllProjects())
        }
    }, [dispatch, loading, message, error, id])


    const fileUploadHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setProjectBanner(file)
            setProjectBannerPreview(reader.result)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", projectName)
        formData.append("description", description)
        formData.append("technologies", technology)
        formData.append("stack", stack)
        formData.append("deployed", deployed)
        formData.append("projectBanner", projectBanner)
        formData.append("githubRepo", gitLink)
        formData.append("deployedLink", projectLink)

        setIsLoading(true)
        dispatch(updateProject(id, formData))
    }

    return (
        <>
            <form className='pl-0 pr-0 xl:pl-[14rem] xl:pr-[14rem] pb-4 m-4'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-sm md:text-xl text-base font-semibold leading-7 text-gray-900 uppercase pt-[2rem] sm:pt-[4rem] md:text-xl tracking-wider">update project</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Project Banner</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {
                                            projectBannerPreview ? (
                                                <img src={projectBannerPreview} className='mx-auto w-full h-[250px]' />
                                            ) : (
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                            )
                                        }

                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span className='text-xs md:text-sm'>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={fileUploadHandler} />
                                            </label>
                                            <p className="pl-1 text-xs md:text-sm">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600 text-xs md:text-sm">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Project Name</label>
                                <div className="mt-2">
                                    <input type="text" name="username" value={projectName} onChange={(e) => setProjectName(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='Mern Stack Portfolio' />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div className="mt-2">
                                    <textarea id="about" name="about" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6 pl-2" placeholder="Feature 1. Feature 2. Feature 3."></textarea>
                                </div>
                                <p className="mt-3 text-xs md:text-sm leading-6 text-gray-600">Write a few details about project.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Technology Used in Project</label>
                                <div className="mt-2">
                                    <textarea id="about" name="about" value={technology} onChange={(e) => setTechnology(e.target.value)} rows="2" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6 pl-2" placeholder="HTML, CSS, Javascript, React"></textarea>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="country" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Stack</label>
                                <div className="mt-2">
                                    <select id="country" name="country" value={stack} onChange={(e) => setStack(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6">
                                        <option value="">Select Project Stack</option>
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="MERN">MERN</option>
                                        <option value="MEAN">MEAN</option>
                                        <option value="REACT.JS">REACT.JS</option>
                                        <option value="NEXT.JS">NEXT.JS</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="country" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Deployed</label>
                                <div className="mt-2">
                                    <select id="country" name="country" value={deployed} onChange={(e) => setDeployed(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6">
                                        <option value="">Is This Project Deployed?</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base text-xs md:text-sm font-semibold leading-7 text-gray-900">Project Links</h2>
                        <p className="mt-1 text-xs md:text-sm leading-6 text-gray-600">Please provide the project links.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Github Repository Link</label>
                                <div className="mt-2">
                                    <input type="text" name="first-name" value={gitLink} onChange={(e) => setGitLink(e.target.value)} placeholder='https://githubLink.com' id="first-name" autoComplete="given-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Project Link</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} placeholder='https://projectLink.com' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {
                        isLoading ? (<LoadingButton content={"Updating..."} />)
                         :
                        (<button type="submit" onClick={submitHandler} className="rounded-md bg-indigo-600 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Project</button>)
                    }




                </div>
            </form >
        </>
    )
}

export default UpdateProject
