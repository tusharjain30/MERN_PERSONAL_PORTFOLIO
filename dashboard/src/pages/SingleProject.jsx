import { Button } from '@/components/ui/button'
import { clearAllErrors, getSingleProject } from '@/redux/Slices/projectSlices'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import RingLoader from "react-spinners/RingLoader";

const SingleProject = () => {

    const { loading, error, singleProject } = useSelector((state) => state.project)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigateTo = useNavigate()
    const {isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {

        if(!isAuthenticated){
            navigateTo('/login')
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllErrors())
        }

    }, [error, dispatch, loading])

    useEffect(() => {
        dispatch(getSingleProject(id))
    }, [id])

    const returnToDashboard = () => {
        navigateTo("/")
    }

    return (
        <>
            <div className='pl-0 pr-0 xl:pl-[14rem] xl:pr-[14rem] pb-4 pt-4 m-4'>
                <div className='flex justify-end'>
                    <Button className="text-xs capitalize" onClick = {returnToDashboard}>Return to dashboard</Button>
                </div>
                <div  className={`${loading ? "h-screen flex justify-center items-center" : ""}`}>
                {
                    loading ? (<RingLoader 
                        color={"#4F46E5"}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />) : (
                        <div className='pt-4 flex justify-center items-start flex-col gap-6' key = {singleProject._id}>
                            <h1 className='font-semibold text-sm sm:text-lg'>{singleProject.title}</h1>
                            <div className='w-full'>
                                <img src={singleProject.projectBanner && singleProject.projectBanner.url} alt="banner" className='w-full h-full' />
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg font-bold'>Description:</h2>
                                <ul className='pl-4 list-disc'>
                                    {
                                        singleProject && singleProject.description && singleProject.description.split(".").map((curVal) => {
                                            return <li className='text-xs md:text-sm pt-2 font-semibold'>{curVal}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg font-bold'>Technologies:</h2>
                                <ul className='pl-4 list-disc'>
                                    {
                                        singleProject && singleProject.technologies && singleProject.technologies.split(",").map((curVal) => {
                                            return <li className='text-xs md:text-sm pt-2 font-semibold'>{curVal}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg font-bold'>Stack:</h2>
                                <ul className='pl-4 list-disc'>
                                    <li className='text-xs md:text-sm pt-2 font-semibold'>{singleProject && singleProject.stack}</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg font-bold'>Deployed:</h2>
                                <ul className='pl-4 list-disc'>
                                    <li className='text-xs md:text-sm pt-2 font-semibold'>{singleProject && singleProject.deployed}</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg capitalize font-bold'>github repository link:</h2>
                                <a href={singleProject && singleProject.githubRepo} target="_blank" className='text-xs md:text-sm pt-2 font-semibold text-blue-600'>{singleProject && singleProject.githubRepo}</a>
                            </div>
                            <div>
                                <h2 className='text-sm md:text-lg capitalize font-bold'>project link:</h2>
                                <a href={singleProject && singleProject.deployedLink} target="_blank" className='text-xs md:text-sm pt-2 font-semibold text-blue-600'>{singleProject && singleProject.deployedLink}</a>
                            </div>
                        </div>
                    )
                }
                </div>
              
            </div>
        </>
    )
}

export default SingleProject
