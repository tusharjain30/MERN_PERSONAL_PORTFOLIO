import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

    const {user} = useSelector((state) => state.user)

    return (
        <div>
            <form className='pb-4'>
                <div>
                    <div className="border-b border-gray-900/10 pb-12">
                    <hr className='sm:hidden sm:mb-0 mb-4'></hr>
                        <h2 className="text-start text-md sm:text-lg md:text-xl lg:text-2xl font-semibold leading-7 tracking-wider capitalize">Profile</h2>
                        <h2 className="text-base font-semibold leading-7 text-muted-slate pt-1 capitalize text-xs tracking-wider">full profile preview</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6'>
                            <div className="flex flex-col items-center justify-center">
                                <img src={user && user.avatar && user.avatar.url} alt="profile" className='hover:scale-110 duration-150 rounded-md h-full w-full' />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <embed src={user && user.resume && user.resume.url} alt="resume" className='hover:scale-110 duration-150 h-full w-full rounded-md' />
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                <div className="mt-2">
                                    <input type="text" name="username" value={user && user.fullName} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='tushar jain' disabled/>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input type="email" name="username" value={user && user.email} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='xyz@gmail.com' disabled/>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="mt-2">
                                    <input type="number" name="username" value={user && user.phone} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='phone number' disabled/>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">About Me</label>
                                <div className="mt-2">
                                    <textarea id="about" name="about" value={user && user.aboutMe} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6 pl-2" placeholder="about me" disabled></textarea>
                                </div>
                                <p className="mt-3 text-xs md:text-sm leading-6 text-gray-600">Few details about yourself.</p>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="username" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Portfolio URL</label>
                                <div className="mt-2">
                                    <input type="text" name="username" value={user && user.portfolioURL} id="username" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" placeholder='portfolio url' disabled />
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
                                    <input type="text" name="first-name" value={user && user.githubURL} placeholder='https://githubLink.com' id="first-name" autoComplete="given-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" disabled/>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Linkedin URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={user && user.linkedinURL} placeholder='linkedin url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" disabled/>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Instagram URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={user && user.instagramURL}placeholder='instagram url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" disabled/>
                                </div>

                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-xs md:text-sm font-medium leading-6 text-gray-900">Facebook URL</label>
                                <div className="mt-2">
                                    <input type="text" name="last-name" value={user && user.facebookURL} placeholder='facebook url' id="last-name" autoComplete="family-name" className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs md:text-sm sm:leading-6" disabled/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div>
    )
}

export default Profile
