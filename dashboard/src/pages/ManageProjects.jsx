import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { Eye, OctagonX, PencilLine } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux'
import { clearAllErrors, deleteProject, getAllProjects, resetProjectSliceData } from '@/redux/Slices/projectSlices'
import { toast } from 'react-toastify'
import RingLoader from "react-spinners/RingLoader";

const ManageProjects = () => {

    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const { loading, message, error, projects } = useSelector((state) => state.project)
    const {isAuthenticated} = useSelector((state) => state.user)

    const returnToDash = () => {
        navigateTo('/')
    }

    useEffect(() => {

        if(!isAuthenticated){
            navigateTo('/login')
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllErrors())
        }

        if (message) {
            toast.success(message)
            dispatch(resetProjectSliceData())
            dispatch(getAllProjects())
        }

    }, [error, dispatch, message, loading])

    const returnToSingleProject = (id) => {
        navigateTo(`/singleProject/${id}`)
    }

   
    const returnToUpdateProject = (id) => {
        navigateTo(`/updateProject/${id}`)
    }

    const deleteHandler = (id) => {
        dispatch(deleteProject(id))
    }

    return (
        <>
            <div className='m-4 h-screen bg-muted/40'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-md sm:text-lg font-semibold tracking-[0.4px]'>Manage your Projects</h1>
                    <Button className="capitalize text-xs" onClick={returnToDash}>Return to Dashboard</Button>
                </div>
                {
                    loading ? (
                        <div className={`${loading ? "h-screen flex justify-center items-center" : ""}`}>
                            <RingLoader
                                color={"#4F46E5"}
                                loading={loading}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : (
                        <div className={`mt-4 mb-4`}>
                            {
                                projects.length > 0 ? (
                                    <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px] text-xs md:text-sm">Banner</TableHead>
                                        <TableHead className="text-xs md:text-sm">Title</TableHead>
                                        <TableHead className="text-xs md:text-sm">Stack</TableHead>
                                        <TableHead className="text-xs md:text-sm">Deployed</TableHead>
                                        <TableHead className="text-right text-xs md:text-sm">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        projects && (projects.length > 0) && projects.map((curVal) => {
                                            return (
                                                <TableRow className="bg-accent" key={curVal._id}>
                                                    <TableCell className="font-medium"><img src={curVal.projectBanner && curVal.projectBanner.url} className='w-24 h-14 rounded-md' /></TableCell>
                                                    <TableCell className="font-semibold text-xs md:text-sm capitalize tracking-[0.8px]">{curVal.title}</TableCell>
                                                    <TableCell className="text-xs md:text-sm capitalize tracking-[0.8px]">{curVal.stack}</TableCell>
                                                    <TableCell className="text-xs md:text-sm capitalize tracking-[0.8px]">{curVal.deployed}</TableCell>
                                                    <TableCell className="text-right text-xs md:text-sm">
                                                        <div className='flex gap-2 items-center justify-end'>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Eye size="30" onClick={() => returnToSingleProject(curVal._id)} className='p-1 font-bolder rounded-full border border-[3px] cursor-pointer hover:text-[white] border-green-500 hover:bg-green-500 duration-200 hover:text-slate-700 text-green-600' />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className='text-xs text-semibold'>View</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <PencilLine size="30" onClick={() => returnToUpdateProject(curVal._id)} className='p-1 font-bolder rounded-full border border-[3px] hover:text-[white] cursor-pointer border-yellow-300 hover:bg-yellow-300 duration-200 hover:text-slate-700 text-yellow-500 ' />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className='text-xs text-semibold'>Update</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <OctagonX size="30" onClick = {() => deleteHandler(curVal._id)} className='p-1 font-bolder rounded-full border border-[3px] hover:text-[white] cursor-pointer border-rose-400 hover:bg-rose-400 duration-200 hover:text-slate-700 text-rose-500 ' />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className='text-xs text-semibold'>Delete</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                                ) : (<>
                                    <h1 className='text-center'>Projects Not Found</h1>
                                </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default ManageProjects
