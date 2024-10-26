import { Button } from '@/components/ui/button'
import { clearAllUserErrors, resetUserSlice, updatePassword } from '@/redux/Slices/userSlices'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingButton from './LoadingButton'

const UpdatePassword = () => {

    const {error, message, loading} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    useEffect(() => {

        if(error){
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if(message){
            toast.success(message)
            dispatch(resetUserSlice())
        }
 
    }, [loading, error, message, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePassword({currentPassword, newPassword, confirmNewPassword}))
        setConfirmNewPassword("")
        setNewPassword("")
        setCurrentPassword("")
    }

    return (
        <div>
            <div>
                <div className='flex flex-col justify-start'>
                <hr className='sm:hidden sm:mb-4 mb-0'></hr>
                    <h1 className='text-start mt-4 text-md sm:text-lg md:text-xl lg:text-2xl font-semibold leading-7 tracking-wider capitalize'>update password</h1>
                    <h2 className="text-base font-semibold leading-7 text-muted-slate pt-1 capitalize text-xs tracking-wider">update your password</h2>
                </div>
                <form className='mt-6'>
                    <div className="col-span-full">
                        <label className="block text-xs md:text-sm font-medium leading-6 text-gray-900 capitalize">current password</label>
                        <div className="mt-2">
                            <input type="password" name="street-address" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="col-span-full mt-4">
                        <label className="block text-xs md:text-sm font-medium leading-6 text-gray-900 capitalize">new password</label>
                        <div className="mt-2">
                            <input type="password" name="street-address" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="col-span-full mt-4">
                        <label className="block text-xs md:text-sm font-medium leading-6 text-gray-900 capitalize">confirm new password</label>
                        <div className="mt-2">
                            <input type="password" name="street-address" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className='mt-4'>
                        {
              loading
                ?
                <LoadingButton content={"Updating..."} width={"w-full"}/>
                :
                        <Button onClick={submitHandler} className="w-full text-xs md:text-sm">Update Password</Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
