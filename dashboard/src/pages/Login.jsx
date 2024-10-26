import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { clearAllUserErrors, getUser, login, resetUserSlice } from "../redux/Slices/userSlices"
import LoadingButton from "./sub-components/LoadingButton"

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigateTo = useNavigate()
    const { loading, isAuthenticated, error, message } = useSelector((state) => state.user)

    useEffect(() => {
        if (isAuthenticated) {
            navigateTo('/')
        }

        if (error) {
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if (message) {
            toast.success(message)
            dispatch(resetUserSlice())
            dispatch(getUser())
        }
    }, [isAuthenticated, error, loading, message])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 min-h-[100vh]">
            <div className="flex items-center justify-center py-12 min-h-[100vh]">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground text-xs md:text-sm">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-xs md:text-sm">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value = {email}
                                onChange = {(e) => setEmail(e.target.value)}
                                className="text-xs md:text-sm"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-xs md:text-sm">Password</Label>
                                <Link
                                    to="/forgot/password"
                                    className="ml-auto inline-block text-sm underline text-xs md:text-sm"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" className="text-xs md:text-sm" placeholder="password" value = {password} onChange = {(e) => setPassword(e.target.value)} required />
                        </div>
                        {
                            !loading ? (
                                <Button type="submit" className="w-full text-xs md:text-sm" onClick = {submitHandler}>
                                    Login
                                </Button>
                            ) : (
                                <LoadingButton content={"Loading..."} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src="https://img.freepik.com/free-vector/appointment-booking-mobile-concept_23-2148581780.jpg?t=st=1726122937~exp=1726126537~hmac=0a2dcaf7e6e978e0149d93550d7cbd237e58fedacd0cd884371eec6c94f9d2a9&w=740"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default Login