import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllUserErrors, resetPassword, resetUserSlice } from '@/redux/Slices/userSlices'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingButton from './sub-components/LoadingButton'

const ResetPassword = () => {

    const [ password, setPassword ] = useState("")
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const { loading, message, error, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const {token} = useParams()

    useEffect(() => {

        if(isAuthenticated){
            navigateTo("/")
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if (message) {
            toast.success(message)
            dispatch(resetUserSlice())
            navigateTo('/')
        }
    }, [message, loading, error, dispatch])

    const passwordHandler = () => {
        dispatch(resetPassword(token, password, confirmPassword))
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12 min-h-[100vh]">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Reset Password</h1>
                            <p className="text-balance text-muted-foreground text-xs md:text-sm">
                                Set a new password
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-xs md:text-sm">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    className="text-xs md:text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-xs md:text-sm">Confirm Password</Label>
                                </div>
                                <Input id="password"
                                    type="password"
                                    placeholder="confirm password"
                                    className="text-xs md:text-sm"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            {
                                loading ? (
                                    <LoadingButton content={"Loading..."} />
                                ) : (
                                    <Button type="submit" className="w-full text-xs md:text-sm" onClick = {passwordHandler}>
                                        Reset Password
                                    </Button>
                                )
                            }


                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted  lg:flex justify-center items-center">
                    <img
                        src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?t=st=1726668865~exp=1726672465~hmac=f7eb651897877989f79a93d31ec670377ef2bd90e95b5142d792dc2542803187&w=740"
                        alt="Image"
                        className="h-[500px] w-[500px] object-cover dark:brightness-[0.2] dark:grayscale rounded-md"
                    />
                </div>
            </div>
        </>
    )
}

export default ResetPassword
