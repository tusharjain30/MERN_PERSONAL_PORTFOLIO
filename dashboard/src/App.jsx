import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useEffect } from "react";
import { getUser } from "./redux/Slices/userSlices";
import { useDispatch } from "react-redux";
import { getAllMessages } from "./redux/Slices/MessageSlices";
import ManageProjects from "./pages/ManageProjects";
import { getAllProjects } from "./redux/Slices/projectSlices";
import SingleProject from "./pages/SingleProject";
import UpdateProject from "./pages/UpdateProject";
import { getAllApplication } from "./redux/Slices/softwareSlices";
import { getAllTimelines } from "./redux/Slices/timelineSlices";
import ManageTimelines from "./pages/ManageTimelines";
import { getAllSkills } from "./redux/Slices/skillSlice";
import ManageSkills from "./pages/ManageSkills";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllProjects())
    dispatch(getAllApplication())
    dispatch(getAllTimelines())
    dispatch(getAllSkills())
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manageProjects" element={<ManageProjects />} />
          <Route path="/singleProject/:id" element={<SingleProject />} />
          <Route path="/updateProject/:id" element={<UpdateProject />} />
          <Route path="/manageTimelines" element={<ManageTimelines />} />
          <Route path="/manageSkills" element={<ManageSkills />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </>
  )
}

export default App
