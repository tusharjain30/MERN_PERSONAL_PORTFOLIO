import React, { useContext, useEffect } from 'react'
import { ThemeProvider } from './components/theme-provider'
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ViewSingleProject from './pages/ViewSingleProject'
import LoadingSpinner from './pages/mini-components/LoadingSpinner'
import { Context } from './main'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const { loading, setLoading, setUser, setTimelines, setSkills, setProjects, setApps } = useContext(Context)


  useEffect(() => {

    const getUser = async () => {
      axios.defaults.withCredentials = true
      try {

        setLoading(true)
        const { data } = await axios.get("http://localhost:4000/api/v1/user/getUserForPortfolio", {
          withCredentials: true
        })

        setUser(data.user)
        setLoading(false)

      } catch (err) {
        setUser({})
        console.log(err)
      }
    }

    const getAllTimelines = async () => {
      axios.defaults.withCredentials = true
      try {

        setLoading(true)
        const { data } = await axios.get("http://localhost:4000/api/v1/timeline/getTimelines", {
          withCredentials: true
        })

        setTimelines(data.timelines)
        setLoading(false)

      } catch (err) {
        setTimelines([])
        console.log(err)
      }
    }

    const getAllSkills = async () => {
      axios.defaults.withCredentials = true
      try {

        setLoading(true)
        const { data } = await axios.get("http://localhost:4000/api/v1/skill/getAllSkills", {
          withCredentials: true
        })

        setSkills(data.skills)
        setLoading(false)

      } catch (err) {
        setSkills([])
        console.log(err)
      }
    }

    const getAllProjects = async () => {
      axios.defaults.withCredentials = true
      try {

        setLoading(true)
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getAllProjects", {
          withCredentials: true
        })

        setProjects(data.projects)
        setLoading(false)

      } catch (err) {
        setProjects([])
        console.log(err)
      }
    }

    const getAllApps = async () => {
      axios.defaults.withCredentials = true
      try {

        setLoading(true)
        const { data } = await axios.get("http://localhost:4000/api/v1/app/getApps", {
          withCredentials: true
        })

        setApps(data.applications)
        setLoading(false)

      } catch (err) {
        setApps([])
        console.log(err)
      }
    }

    getUser()
    getAllTimelines()
    getAllProjects()
    getAllApps()
    getAllSkills()

  }, [])

  return (

    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>

      {
        loading ? (
          <div className='h-screen flex justify-center items-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <Router>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/viewProject/:id'} element={<ViewSingleProject />} />
            </Routes>
            <ToastContainer theme='dark' position='bottom-right'/>
          </Router>
        )
      }

    </ThemeProvider>




  )
}

export default App
