import React from 'react'
import Header from './mini-components/Header'
import Timeline from './mini-components/Timeline'
import AboutMe from './mini-components/AboutMe'
import Skills from './mini-components/Skills'
import MyApps from './mini-components/MyApps'
import Projects from './mini-components/Projects'
import ContactMe from './mini-components/ContactMe'
import Footer from './mini-components/Footer'

const Home = () => {
  return (
    <div>
        <Header />
        <Timeline />
        <AboutMe/>
        <Skills />
        <Projects />
        <MyApps />
        <ContactMe />
        <Footer />
    </div>
  )
}

export default Home
