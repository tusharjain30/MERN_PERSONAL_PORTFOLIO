import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAllUserErrors, forgotPassword, resetUserSlice } from '@/redux/Slices/userSlices'
import LoadingButton from './sub-components/LoadingButton'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const { loading, error, message, isAuthenticated } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigateTo = useNavigate()

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
        }

    }, [loading, error, message, dispatch])

    const passwordHandler = () => {
        dispatch(forgotPassword(email))
        setEmail("")
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12 min-h-[100vh]">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Forgot Password</h1>
                            <p className="text-balance text-muted-foreground text-xs md:text-sm">
                                Enter your email to request for reset password
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className="text-xs md:text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Link
                                        to="/login"
                                        className="ml-auto inline-block text-sm underline text-xs md:text-sm"
                                    >
                                        Remember your password?
                                    </Link>
                                </div>
                            </div>
                            {
                                loading ? <LoadingButton content={"Loading..."}/> : (
                                    <Button type="submit" className="w-full text-xs md:text-sm" onClick = {passwordHandler}>
                                        Forgot Password
                                    </Button>
                                )
                            }

                        </div>

                    </div>
                </div>
                <div className="hidden bg-muted lg:flex justify-center items-center">
                    <img
                        src="https://img.freepik.com/free-vector/data-stealing-malware-abstract-concept-illustration_335657-2128.jpg?t=st=1726667570~exp=1726671170~hmac=1de8cd1c4f2b8677d35099f2a75a7dbf75e2076e833ba68481d1352ef66cc33a&w=740"
                        alt="Image"
                        className="h-[500px] w-[500px] object-cover dark:brightness-[0.2] dark:grayscale rounded-md"
                    />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
