import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { clearAllTimelineErrors, deleteTimeline, getAllTimelines, resetTimelinesSlice } from '@/redux/Slices/timelineSlices'
import { OctagonX } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const ManageTimelines = () => {

    const navigateTo = useNavigate()

    const dispatch = useDispatch()

    const returnToDash = () => {
        navigateTo('/')
    }

    const {isAuthenticated} = useSelector((state) => state.user)
    const {timelines, loading, message, error} = useSelector((state) => state.timeline)
    

    useEffect(() => {

        if(!isAuthenticated){
            navigateTo('/login')
        }

        if(error){
            toast.error(error)
            dispatch(clearAllTimelineErrors())
        }

        if(message){
            toast.success(message)
            dispatch(resetTimelinesSlice())
            dispatch(getAllTimelines())
        }

    }, [error, message, dispatch, loading])

    const deleteTimeLineHandler = (id) => {
        dispatch(deleteTimeline(id))
    }

    return (
        <>
            <div className='m-4 h-screen bg-muted/40'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-md sm:text-lg font-semibold tracking-[0.4px] capitalize'>Manage your timelines</h1>
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
                                timelines.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px] text-xs md:text-sm">Title</TableHead>
                                                <TableHead className="text-xs md:text-sm text-center">Description</TableHead>
                                                <TableHead className="text-xs md:text-sm">From</TableHead>
                                                <TableHead className="text-xs md:text-sm">To</TableHead>
                                                <TableHead className="text-right text-xs md:text-sm">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                timelines && (timelines.length > 0) && timelines.map((curVal) => {
                                                    return (
                                                        <TableRow className="bg-accent" key={curVal._id}>
                                        
                                                            <TableCell className="font-semibold text-xs md:text-sm capitalize tracking-[0.8px]">{curVal.title}</TableCell>
                                                            <TableCell className="text-xs md:text-sm capitalize tracking-[0.8px] text-center">{curVal.description}</TableCell>
                                                            <TableCell className="text-xs md:text-sm capitalize tracking-[0.8px]">{(curVal.timeline && curVal.timeline.from) ? curVal.timeline.from : "--"}</TableCell>
                                                            <TableCell className="text-xs md:text-sm capitalize tracking-[0.8px]">{(curVal.timeline && curVal.timeline.to) ? curVal.timeline.to : "--"}</TableCell>
                                                            <TableCell className="text-right text-xs md:text-sm">
                                                                <div className='flex gap-2 items-center justify-end'>
                                                                <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <OctagonX size="25" onClick = {() => deleteTimeLineHandler(curVal._id)} className='p-1 font-bolder rounded-full border border-[3px] hover:text-[white] cursor-pointer border-rose-400 hover:bg-rose-400 duration-200 hover:text-slate-700 text-rose-500 ' />
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
                                    <h1 className='text-center capitalize'>timelines Not Found</h1>
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

export default ManageTimelines
