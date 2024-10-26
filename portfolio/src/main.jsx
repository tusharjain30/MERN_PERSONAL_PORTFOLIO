import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

export const Context = createContext({})

const AppWrapper = () => {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [timelines, setTimelines] = useState([])
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [apps, setApps] = useState([])

  return <Context.Provider value={{ loading, setLoading, user, setUser, timelines, setTimelines, skills, setSkills, projects, setProjects, apps, setApps }}>
    <App />
  </Context.Provider>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
