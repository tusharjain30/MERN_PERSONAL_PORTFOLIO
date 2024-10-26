import React, { useEffect, useState } from 'react'
import TopBar from './sub-components/TopBar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllMessageSlice, deleteMessages, getAllMessages, resetAllMessageSlice } from '@/redux/Slices/MessageSlices'
import LoadingButton from './sub-components/LoadingButton'

const Messages = () => {

  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { messages, error, message, loading } = useSelector(state => state.message)
  const [messageId, setMessageId] = useState("")

  const returnToDash = () => {
    navigateTo("/login")
  }

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearAllMessageSlice())
    }

    if (message) {
      toast.success(message)
      dispatch(resetAllMessageSlice())
      dispatch(getAllMessages())
    }

  }, [dispatch, error, loading, message, messages])

  const deleteHandler = (id) => {
    setMessageId(id)
    dispatch(deleteMessages(id))
  }

  return (
    <div>
      <TopBar />
      <Card className="w-full p-4 mt-4 mb-4">
        <div className='flex flex-wrap justify-between w-full'>
          <h1 className='pt-2 pb-6 md:text-lg font-bold tracking-[1px]'>Messages</h1>
          <Button className="text-xs w-fit" onClick={returnToDash}>Return To Dashboard</Button>
        </div>
        {
          (messages && messages.length == 0) ? (
            <div className='flex justify-center-items-center h-screen'>
              <h1>No Messages Found</h1>
            </div>
          ) : (
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
          {
            messages && messages.map((curVal) => {
              return (
                <Card key={curVal._id}>
                  <CardContent className="flex flex-col gap-4 p-4">
                    <CardDescription className='text-xs font-semibold text-slate-950'>Sender Name: <span className='capitalize text-primary'>{curVal.senderName}</span></CardDescription>
                    <CardDescription className='text-xs font-semibold text-slate-950'>Subject: <span className='capitalize text-primary'>{curVal.subject}</span></CardDescription>
                    <CardDescription className='text-xs font-semibold text-slate-950'>Message: <span className='capitalize text-primary'>{curVal.message}</span></CardDescription>
                    <CardDescription className='text-xs font-semibold text-slate-950'>Date: <span className='capitalize text-primary'>{curVal.createdAt.toString().slice(0,10)}</span></CardDescription>
                    <CardFooter className='flex justify-end'>
                      {
                        loading && (messageId == curVal._id)
                          ?
                          <LoadingButton content={"Deleting..."} />
                          :
                          <Button className="text-xs w-fit" onClick={() => deleteHandler(curVal._id)}>Delete</Button>
                      }
                    </CardFooter>
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
          )
        }
      </Card>

    </div>
  )
}

export default Messages
