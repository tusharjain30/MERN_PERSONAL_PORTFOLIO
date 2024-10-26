import { History, LayoutGrid, LogOut, MessageSquareMore, SquareMenu, Package, PanelsTopLeft, PencilRuler, UserRoundPen} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Project from './AddProject'
import Dashboard from './Dashboard'
import SoftwareApp from './AddSoftwareApp'
import Messages from './Messages'
import Skills from './AddSkills'
import Timeline from './AddTimeline'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllUserErrors, resetUserSlice } from '../redux/Slices/userSlices'
import { useNavigate } from 'react-router-dom'
import LoadingButton from './sub-components/LoadingButton'
import { logout } from '../redux/Slices/userSlices'
import ProfileDashboard from './ProfileDashboard'

const Home = () => {

    const [active, setActive] = useState("Home")
    const dispatch = useDispatch()
    const { isAuthenticated, loading, message, error } = useSelector((state) => state.user)
    const navigateTo = useNavigate()

    const logoutHandler = () => {
        setActive("Logout")
        dispatch(logout())
    }

    useEffect(() => {

        if (!isAuthenticated) {
            navigateTo('/login')
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if (message) {
            toast.success(message)
            dispatch(resetUserSlice())
        }
    }, [dispatch, message, error, loading, isAuthenticated])

    return (
        <div className='w-full bg-muted/40 min-h-screen flex'>
            <aside className='fixed left-0 min-h-screen sm:bg-background sm:border-r w-14'>
                <nav className='hidden sm:flex flex-col items-center justify-between pt-4 pb-4 min-h-screen'>
                    <div className='flex flex-col gap-4'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Package className={`cursor-pointer ${active == "Home" ? "bg-[#09090B] text-white" : ""} p-1 rounded-full duration-200 hover:scale-110`} size={26} onClick={() => setActive("Home")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Dashboard</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PanelsTopLeft className={`cursor-pointer ${active == "Project" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("Project")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Add Project</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <PencilRuler className={`cursor-pointer ${active == "Skill" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("Skill")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Add Skill</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <LayoutGrid className={`cursor-pointer ${active == "App" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("App")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Add Software App</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <History className={`cursor-pointer ${active == "Timeline" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("Timeline")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Add Timeline</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <MessageSquareMore className={`cursor-pointer ${active == "Message" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("Message")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>See Messages</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <UserRoundPen className={`cursor-pointer ${active == "Profile" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={() => setActive("Profile")} />
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p className='text-xs font-bold'>Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div>
                        {
                            loading ? (
                                <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            ) : (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <LogOut className={`cursor-pointer ${active == "Logout" ? "bg-[#EBEBEF]" : ""} p-1 rounded-full text-[#09090B] duration-200 hover:scale-110`} size={26} onClick={logoutHandler} />
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p className='text-xs font-bold'>Logout</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        }
                    </div>
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <SquareMenu size="35" className="cursor-pointer ml-2 mt-2" />
                    </SheetTrigger>
                    <SheetContent className="pt-[3rem] flex flex-col gap-8">
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Home" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Home")}>Dashboard</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Project" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Project")}>Add Project</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Skill" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Skill")}>Add Skill</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "App" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("App")}>Add Software App</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Timeline" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Timeline")}>Add Timeline</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Message" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Message")}>See Messages</h1>
                        <h1 className={`text-xs hover:font-bold hover:text-primary duration-500 cursor-pointer text-muted-foreground ${active == "Profile" ? "text-primary font-bold" : "font-semibold"}`} onClick={() => setActive("Profile")}>Profile</h1>
                        {
                            loading ? <LoadingButton content={"logged out..."} /> : <Button className="text-xs" onClick={logoutHandler}>Logout</Button>
                        }

                    </SheetContent>
                </Sheet>
            </aside>

            <section className='m-2 sm:ml-24 sm:mr-24 sm:ml-16 sm:mr-16 w-full mt-14 sm:mt-4'>

                {
                    (() => {
                        switch (active) {
                            case "Project": {
                                return <Project />
                                break;
                            }
                            case "Skill": {
                                return <Skills />
                                break;
                            }
                            case "App": {
                                return <SoftwareApp />
                                break;
                            }
                            case "Message": {
                                return <Messages />
                                break;
                            }
                            case "Profile": {
                                return <ProfileDashboard />
                                break;
                            }
                            case "Timeline": {
                                return <Timeline />
                                break;
                            }
                            default: {
                                return <Dashboard />
                                break;
                            }
                        }
                    })()
                }
            </section>
        </div>
    )
}

export default Home
