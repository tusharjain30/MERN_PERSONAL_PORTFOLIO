import React, { useEffect, useState } from 'react'
import LoadingButton from './sub-components/LoadingButton'
import TopBar from './sub-components/TopBar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from 'react-toastify'
import { Progress } from "@/components/ui/progress"
import axios from 'axios'
import { clearAllApplicationErrors, getAllApplication, resetAllApplicationSlice, deleteApplication } from '@/redux/Slices/softwareSlices'

const Dashboard = () => {

  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { projects } = useSelector((state) => state.project)
  const { user } = useSelector((state) => state.user)
  const { skills } = useSelector((state) => state.skill)
  const [applicationId, setApplicationId] = useState("")
  const { applications, error, message, loading } = useSelector((state) => state.application)
  const { timelines } = useSelector((state) => state.timeline)

  const deleteApplicationHandler = (id) => {
    setApplicationId(id)
    dispatch(deleteApplication(id))
  }

  const goTOManageProjects = (e) => {
    e.preventDefault()
    navigateTo("/manageProjects")
  }

  const returnToSingleProject = (id) => {
    navigateTo(`/singleProject/${id}`)
  }

  const returnToUpdateProject = (id) => {
    navigateTo(`/updateProject/${id}`)
  }

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearAllApplicationErrors())
    }

    if (message) {
      toast.success(message)
      dispatch(resetAllApplicationSlice())
      dispatch(getAllApplication())
    }

  }, [message, error, loading, dispatch])

  useEffect(() => {

    // dispatch(getAllApplication())

  }, [])


  const returnToManageTimelines = () => {
    navigateTo('/manageTimelines')
  }

  const returnToManageSkills = () => {
    navigateTo('/manageSkills')
  }


  return (
    <>
      <TopBar />
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 mt-4'>
        <Card className="lg:col-span-3 col-span-full">
          <CardHeader className="text-xs font-semibold capitalize leading-5 text-justify text-slate-950 tracking-[0.4px] md:tracking-[0px] text-wrap text-balance text-pretty">{user && user.aboutMe}</CardHeader>
          <CardFooter><a href='https://tusharjain-portfolio.netlify.app' target='_blank'><Button className="capitalize tracking-[0.5px] text-xs">visit Portfolio</Button></a></CardFooter>
        </Card>
        <Card className="lg:col-span-1 col-span-full">
          <CardHeader className="capitalize text-lg md:text-xl leading-7 font-semibold">Projects completed</CardHeader>
          <CardContent className="text-3xl font-bold">{projects && projects.length}</CardContent>
          <CardFooter><Button className="capitalize tracking-[0.5px] text-xs" onClick={goTOManageProjects}>Manage projects</Button></CardFooter>
        </Card>
        <Card className="lg:col-span-1 col-span-full">
          <CardHeader className="capitalize text-lg md:text-xl leading-7 font-semibold">skills</CardHeader>
          <CardContent className="text-3xl font-bold">{skills.length}</CardContent>
          <CardFooter><Button className="capitalize tracking-[0.5px] text-xs" onClick={returnToManageSkills}>Manage Skills</Button></CardFooter>
        </Card>
      </div>
      <Card className="p-4 mt-4">
        <CardHeader className="text-start font-semibold text-sm md:text-lg p-4">Projects</CardHeader>
        <CardContent className={`mb-4`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-xs sm:text-sm hidden md:table-cell">Banner</TableHead>
                <TableHead className="text-xs sm:text-sm">Title</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Stack</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">Deployed</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Update</TableHead>
                <TableHead className="text-right text-xs sm:text-sm">Visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                projects.map((curVal) => {
                  return (
                    <TableRow className="bg-accent" key={curVal._id}>
                      <TableCell className="font-medium  hidden md:table-cell"><img src={curVal.projectBanner && curVal.projectBanner.url} className='w-24 h-14 rounded-md' /></TableCell>
                      <TableCell className="font-semibold text-xs md:text-sm capitalize">{curVal.title}</TableCell>
                      <TableCell className="text-xs md:text-sm capitalize hidden sm:table-cell">{curVal.stack}</TableCell>
                      <TableCell className="text-xs md:text-sm hidden md:table-cell capitalize">{curVal.deployed}</TableCell>
                      <TableCell className="text-right text-xs md:text-sm"><Button className="text-xs" onClick={() => returnToUpdateProject(curVal._id)}>Update</Button></TableCell>
                      <TableCell className="text-right text-xs md:text-sm"><Button className="text-xs" onClick={() => returnToSingleProject(curVal._id)}>Visit</Button></TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="p-4 mb-4 mt-4">
        <CardHeader className="text-start font-semibold text-sm md:text-lg">Skills</CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {
            skills && skills.map((skill) => {
              return (
                <Card key={skill._id}>
                  <CardHeader className = "text-xs md:text-sm font-semibold">{skill.title}</CardHeader>
                  <CardContent>
                    <Progress value={skill.proficiency} className="w-[100%]" />
                    <p className='pt-4 text-xs'>{skill.proficiency}%</p>
                  </CardContent>
                </Card>
              )
            })
          }
        </CardContent>
      </Card>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Card className="p-4 mb-4">
          <CardHeader className="text-start font-semibold text-md md:text-lg ">Software Applications</CardHeader>
          {
            applications && (applications.length == 0)
              ?
              (<h1 className='text-center text-sm'>Software Applications Not Found</h1>)
              :
              (<Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-xs">Name</TableHead>
                    <TableHead className="text-center text-xs">Icons</TableHead>
                    <TableHead className="text-right text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    applications && applications.map((application) => {
                      return (
                        <TableRow key={application._id} className="bg-accent">
                          <TableCell className="font-medium text-xs">{application.name}</TableCell>
                          <TableCell className="font-medium flex items-center justify-center">
                            <img src={application && application.svg && application.svg.url} alt="icons" className='w-auto h-8' />
                          </TableCell>
                          <TableCell className="text-xs text-right">
                            {
                              (applicationId == application._id) && loading ? <LoadingButton content={"Deleting..."} /> : <Button className="text-xs" onClick={() => deleteApplicationHandler(application._id)}>Delete</Button>
                            }
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }

                </TableBody>
              </Table>)
          }
        </Card>

        <Card className="p-4 mb-4">
          <div className='w-full flex justify-between items-center'>
            <CardHeader className="text-start font-semibold text-sm md:text-lg">Timelines</CardHeader>
            <Button className="text-xs" onClick={returnToManageTimelines}>Manage Timelines</Button>
          </div>
          {
            timelines && (timelines.length == 0)
              ?
              (<h1 className='text-center text-sm'>Timelines Not Found</h1>)
              :
              (<Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-xs">Title</TableHead>
                    <TableHead className="text-center text-xs">From</TableHead>
                    <TableHead className="text-right text-xs">To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    timelines && timelines.map((timeline) => {
                      return (
                        <TableRow key={timeline._id} className="bg-accent">
                          <TableCell className="font-medium text-xs">{timeline.title}</TableCell>
                          <TableCell className="font-medium text-center text-xs">{(timeline && timeline.timeline && timeline.timeline.from) ? timeline.timeline.from : "--"}</TableCell>
                          <TableCell className="font-medium text-right text-xs">{(timeline && timeline.timeline && timeline.timeline.to) ? timeline.timeline.to : "--"}</TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>)
          }
        </Card>
      </div>

    </>
  )
}

export default Dashboard
