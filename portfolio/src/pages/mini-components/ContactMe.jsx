import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ContactMe = () => {

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true
        try {

            const { data } = await axios.post("http://localhost:4000/api/v1/message/sendMessage", {
                senderName: name,
                subject,
                message
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            toast.success(data.message)
            setName("")
            setSubject("")
            setMessage("")

        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return (
        <section className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] gap-16 flex flex-col justify-center items-center pt-[2rem] pb-[4rem] w-full'>
            <h1 className='text-3xl md:text-5xl font-bold uppercase text-white text-center flex gap-6'>Contact <span className='text-tubeLight-effect'>me</span></h1>
            <div className='flex flex-col justify-center items-center gap-4 w-full'>
                <form className='w-full'>
                    <div className='flex flex-col gap-1 justify-center items-start'>
                        <label className='text-white font-semibold md:text-sm text-xs'>Your Name</label>
                        <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} className='px-2 py-2 outline-none text-sm w-full border border-white rounded-md  bg-transparent text-white' name="user_name" autoComplete="off" required />
                    </div>
                    <div className='flex flex-col gap-1 justify-center items-start pt-6'>
                        <label className='text-white font-semibold md:text-sm text-xs'>Subject</label>
                        <input type="text" placeholder='Your Subject' value={subject} onChange={(e) => setSubject(e.target.value)} className='px-2 py-2 outline-none text-sm w-full border border-white rounded-md  bg-transparent text-white' name="user_email" autoComplete="off" required />
                    </div>
                    <div className='flex flex-col gap-1 justify-center items-start pt-6'>
                        <label className='text-white font-semibold md:text-sm text-xs'>Message</label>
                        <input type="text" placeholder='Your Message' value={message} onChange={(e) => setMessage(e.target.value)} className='px-2 py-2 outline-none text-sm w-full border border-white rounded-md  bg-transparent text-white' name="message" autoComplete="off" required />
                    </div>
                    <div className='flex flex-col gap-1 justify-center items-end pt-6'>
                        <button onClick={submitHandler} className='flex gap-2 items-center uppercase text-xs bg-[#F7F9FB] hover:bg-[#d4d6d8] duration-300 transition-all pt-2 font-semibold box_shadow pb-2 pl-4 pr-4 text-slate-950 rounded-md cursor-pointer tracking-[1px]'>send message</button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className='text-3xl pt-4 pb-1 md:text-5xl font-bold uppercase text-white text-center tracking-[2px] dancing-script text-tubeLight-effect'>Thanks for scrolling</h1>
            </div>
        </section>
    )
}

export default ContactMe
