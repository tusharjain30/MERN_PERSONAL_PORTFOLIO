import { Context } from '../../main'
import { ExternalLink, Facebook, Github, Instagram, Linkedin } from 'lucide-react'
import React, { useContext } from 'react'


const Header = () => {

    const { user } = useContext(Context)

    return (
        <div className='pl-6 pr-6 lg:pl-[16rem] lg:pr-[16rem] pt-[6rem] flex flex-col gap-6'>
            <div className='flex gap-2 items-center'>
                <div className='w-2 h-2 border rounded-full bg-[#00C401]'></div>
                <p className='text-[0.6rem] md:text-[0.7rem]'>Online</p>
            </div>
            <div className='flex flex-col gap-6'>
                <h1 className='text-2xl md:text-4xl tracking-[2px]'>Hey, I'm Tushar Jain</h1>
                <h1 className='text-2xl md:text-4xl capitalize text-tubeLight-effect dancing-script tracking-[6px]'>Full Stack Developer</h1>
            </div>
            <div className='flex items-center gap-4 bg-[#F7F9FB] w-fit pt-2 pb-2 pl-4 pr-4 rounded-xl box_shadow'>
                <a href={user && user.instagramURL} target='_blank'><Instagram size={"20"} className='text-[#CB3B93] cursor-pointer font-bold' /></a>
                <a href={user && user.facebookURL} target='_blank'><Facebook size={"20"} className='text-[#395693] cursor-pointer font-bold' /></a>
                <a href={user && user.linkedinURL} target='_blank'><Linkedin size={"20"} className='text-[#0077AF] cursor-pointer font-bold' /></a>
                <a href={user && user.githubURL} target='_blank'><Github size={"20"} className='text-[#435761] cursor-pointer font-bold' /></a>
            </div>
            <div>
                <a href={user && user.resume && user.resume.url} target="_blank" className='flex gap-2 w-fit items-center text-[0.6rem] md:text-xs bg-[#F7F9FB] hover:bg-[#d4d6d8] duration-300 transition-all p-2 text-slate-950 rounded-xl cursor-pointer tracking-[1px]'><ExternalLink className='text-[#4F46E5]' size="15" />View Resume</a>
            </div>
            <div>
                <p className='text-justify leading-7 text-xs md:text-sm capitalize'>Targeting Full Stack Developer roles with an organization of high repute with a scope of improving Knowledge and further career growth.</p>
            </div>
            <hr></hr>
        </div>
    )
}

export default Header
