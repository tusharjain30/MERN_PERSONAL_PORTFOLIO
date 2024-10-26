import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingButton from './LoadingButton';
import { toast } from 'react-toastify';
import { clearAllUserErrors, resetUserSlice, updateProfile } from '@/redux/Slices/userSlices';

const UpdateProfile = () => {

    const { user, isUpdate, error, message, loading } = useSelector((state) => state.user)
    const [name, setName] = useState(user && user.fullName)
    const [email, setEmail] = useState(user && user.email)
    const [phone, setPhone] = useState(user && user.phone)
    const [aboutMe, setAboutMe] = useState(user && user.aboutMe)
    const [portFolioURL, setPortFolioURL] = useState(user && user.portfolioURL)
    const [linkedinURL, setLinkedinURL] = useState(user && user.linkedinURL)
    const [instagramURL, setInstagramURL] = useState(user && user.instagramURL)
    const [facebookURL, setFacebookURL] = useState(user && user.facebookURL)
    const [githubURL, setGithubURL] = useState(user && user.githubURL)
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url)
    const [resume, setResume] = useState("")
    const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url)
    const dispatch = useDispatch()

    useEffect(() => {

        if(error){
            toast.error(error)
            dispatch(clearAllUserErrors())
        }

        if(message){
            toast.success(message)
            dispatch(resetUserSlice())
        }

    }, [error, dispatch, message, loading])

    const profileRef = useRef();
    const resumeRef = useRef();

    const uploadProfileHandler = () => {
        profileRef.current.click();
    }

    const profileHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setAvatar(file)
            setAvatarPreview(reader.result)
        }
    }

    const uploadResumeHandler = () => {
        resumeRef.current.click();
    }

    const resumeHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setResume(file)
            setResumePreview(reader.result)
        }
    }

    const profileUpdateHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullName", name)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("aboutMe", aboutMe)
        formData.append("githubURL", githubURL)
        formData.append("instagramURL", instagramURL)
        formData.append("facebookURL", facebookURL)
        formData.append("linkedinURL", linkedinURL)
        formData.append("portfolioURL", portFolioURL)
        formData.append("avatar", avatar)
        formData.append("resume", resume)

        dispatch(updateProfile(formData))
    }


    return (
        <div>
            <form className='pb-4'>
                <div>
                    <div className="border-b border-gray-900/10 pb-12">
                    <hr className='sm:hidden sm:mb-0 mb-4'></hr>
                        <h2 className="text-start text-md sm:text-lg md:text-xl lg:text-2xl font-semibold leading-7 tracking-wider capitalize">update profile</h2>
                        <h2 className="text-base font-semibold leading-7 text-muted-slate pt-1 capitalize text-xs tracking-wider">update your profile here</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6'>
                            <div className="flex flex-col items-center justify-center">
                                <img src={avatarPreview} alt="profile" className='hover:scale-110 duration-150 rounded-md h-full w-full' />
                                <button type="button" onClick={uploadProfileHandler} className="w-full mt-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 capitalize">Choose Profile</button>
                                <input type="file" ref={profileRef} className='hidden' onChange={profileHandler} />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <embed src={resumePreview} alt="resume" className='hover:scale-110 duration-150 h-full w-full rounded-md' />
                                <button type="button" onClick={uploadResumeHandler} className="w-full mt-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 capitalize">Choose Resume</button>
                                <input type="file" ref={resumeRef} className='hidden' onChange={resumeHandler}/>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                <div className="mt-2">
                                    <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='tushar jain' />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input type="email" name="username" value={email} onChange={(e) => setEmail(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='xyz@gmail.com' />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                    <input type="number" name="username" value={phone} onChange={(e) => setPhone(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='phone number' />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">About Me</label>
                                <div className="mt-2">
                                    <textarea id="about" name="about" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6 pl-2" placeholder="about me"></textarea>
                                </div>
                                <p className="mt-3 text-xs md:text-sm leading-6 text-gray-600">Few details about yourself.</p>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Portfolio URL</label>
                                <div className="mt-2">
                                    <input type="text" name="username" value={portFolioURL} onChange={(e) => setPortFolioURL(e.target.value)} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='portfolio url' />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Social Links</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Github URL</label>
                                <div className="mt-2">
                                    <input type="text" name="first-name" value={githubURL} onChange={(e) => setGithubURL(e.target.value)} placeholder='https://githubLink.com' id="first-name" autoComplete="given-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Linkedin URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={linkedinURL} onChange={(e) => setLinkedinURL(e.target.value)} placeholder='linkedin url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Instagram URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={instagramURL} onChange={(e) => setInstagramURL(e.target.value)} placeholder='instagram url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>

                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Facebook URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={facebookURL} onChange={(e) => setFacebookURL(e.target.value)} placeholder='facebook url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {
                  loading ? <LoadingButton content={"Updating..."} /> : (
                    <button type="submit" onClick={profileUpdateHandler} className="rounded-md bg-indigo-600 px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update Profile</button>
                    )
                }
                </div>
            </form >
        </div>
    )
}

export default UpdateProfile
