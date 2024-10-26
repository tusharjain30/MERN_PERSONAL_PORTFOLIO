import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAllSkillErrors, deleteSkill, getAllSkills, resetSkillsSlice, updateSkill } from '@/redux/Slices/skillSlice'
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'

const ManageSkills = () => {

    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const { skills, loading, error, message } = useSelector((state) => state.skill)
    const [newProficiency, setNewProficiency] = useState(1)
    const {isAuthenticated} = useSelector((state) => state.user)

    useEffect(() => {

        if(!isAuthenticated){
            navigateTo('/login')
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllSkillErrors())
        }

        if (message) {
            toast.success(message)
            dispatch(resetSkillsSlice())
            dispatch(getAllSkills())
        }

    }, [dispatch, error, message, loading])

    const returnToDash = () => {
        navigateTo('/')
    }

    const removeSkillHandler = (id) => {
        dispatch(deleteSkill(id))
    }

    const handleInputChange = (proficiency) => {
        setNewProficiency(proficiency)
    }

    const updateSkillHandler = (id) => {
        dispatch(updateSkill(id, newProficiency))
    }

    return (
        <>
            <div className="m-4">
                <div className="flex justify-between mt-4 items-center">
                    <CardContent className="font-medium text-sm md:text-xl lg:text-2xl">Manage Your Skills</CardContent>
                    <CardContent><Button className="text-xs" onClick={returnToDash}>Return To Dashboard</Button></CardContent>
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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {
                                skills && skills.map((skill) => {
                                    return (
                                        <Card className="p-4" key = {skill._id}>
                                            <div className='flex justify-between pt-2'>
                                                <CardTitle className="text-xs md:text-sm">{skill.title}</CardTitle>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger><X size="15" onClick={() => removeSkillHandler(skill._id)} className='cursor-pointer hover:text-rose-600' /></TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='text-xs font-semibold'>Remove</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                            </div>
                                            <div className='flex gap-2 pt-4'>
                                                <h2 className='text-xs md:text-sm'>Proficiency:</h2>
                                                <input type="number"
                                                    defaultValue={skill.proficiency}
                                                    onChange={(e) => handleInputChange(e.target.value)}
                                                    onBlur={() => updateSkillHandler(skill._id)}
                                                    className='border outline-none w-full pl-2 pr-2 text-xs md:text-sm' />
                                            </div>
                                        </Card>

                                    )
                                })
                            }

                        </div>
                    )
                }

            </div>
        </>
    )
}

export default ManageSkills
