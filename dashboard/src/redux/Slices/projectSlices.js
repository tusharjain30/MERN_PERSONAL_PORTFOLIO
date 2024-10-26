import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        error: null,
        message: null,
        loading: false,
        singleProject: {}
    },
    reducers: {
        addNewProjectRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        addNewProjectSuccess(state, action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        addNewProjectFailed(state, action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        loadProjectRequest(state, action){
            state.loading = true
            state.projects = state.projects
            state.error = null
            state.message = null
        },
        loadProjectSuccess(state, action){
            state.loading = false
            state.projects = action.payload
            state.error = null
            state.message = null
        },
        loadProjectFailed(state, action){
            state.loading = false
            state.projects = []
            state.error = action.payload
            state.message = null
        },
        loadSingleProjectRequest(state, action){
            state.loading = true
            state.singleProject = {}
            state.error = null
            state.message = null
        },
        loadSingleProjectSuccess(state, action){
            state.loading = false
            state.singleProject = action.payload
            state.error = null
            state.message = null
        },
        loadSingleProjectFailed(state, action){
            state.loading = false
            state.singleProject = {}
            state.error = action.payload
            state.message = null
        },
        loadSingleProjectFailed(state, action){
            state.loading = false
            state.singleProject = state.singleProject
        },
        updateProjectRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        updateProjectSuccess(state, action){
            state.loading = false
            state.error = null
            state.message = action.payload.message
        },
        updateProjectFailed(state, action){
            state.loading = false,
            state.error = action.payload
            state.message = null
        },
        deleteProjectRequest(state, action){
            state.message = null
            state.error = null
            state.projects = state.projects
        },
        deleteProjectSuccess(state, action){
            state.message = action.payload.message
            state.error = null
            state.projects = state.projects
        },
        deleteProjectFailed(state, action){
            state.message = null
            state.error = action.payload
            state.projects = state.projects
        },
        clearAllProjectErrors(state, action){
            state.error = null
            state.loading = false
        },
        resetProjectSlice(state, action){
            state.error = null
            state.loading = false
            state.message = null
            state.projects = state.projects
        },
    }
});

export const addNewProject = (projectData) => async(dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest())
    try{

        const {data} = await axios.post("http://localhost:4000/api/v1/project/addNewProject", projectData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch(projectSlice.actions.addNewProjectSuccess(data.message))
        dispatch(projectSlice.actions.clearAllProjectErrors())
        
    }catch(err){
        dispatch(projectSlice.actions.addNewProjectFailed(err.response.data.message))
    }
};

export const getAllProjects = () => async(dispatch) => {
    dispatch(projectSlice.actions.loadProjectRequest())
    try{

        const {data} = await axios.get("http://localhost:4000/api/v1/project/getAllProjects", {
            withCredentials: true
        })

        dispatch(projectSlice.actions.loadProjectSuccess(data.projects))
        dispatch(projectSlice.actions.clearAllProjectErrors())
        
    }catch(err){
        dispatch(projectSlice.actions.loadProjectFailed(err.response.data.message))
    }
};

export const getSingleProject = (id) => async(dispatch) => {
    dispatch(projectSlice.actions.loadSingleProjectRequest())
    try{

        const {data} = await axios.get(`http://localhost:4000/api/v1/project/getSingleProject/${id}`, {
            withCredentials: true
        })

        dispatch(projectSlice.actions.loadSingleProjectSuccess(data.project))
        dispatch(projectSlice.actions.clearAllProjectErrors())
        
    }catch(err){
        dispatch(projectSlice.actions.loadSingleProjectFailed(err.response.data.message))
    }
};

export const updateProject = (id, updatedData) => async(dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest())
    try{

        const {data} = await axios.put(`http://localhost:4000/api/v1/project/updateProject/${id}`, updatedData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch(projectSlice.actions.updateProjectSuccess(data))
        dispatch(projectSlice.actions.clearAllProjectErrors())

    }catch(err){
        dispatch(projectSlice.actions.updateProjectFailed(err.response.data.message))
    }
}

export const deleteProject = (id) => async(dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest())
    try{

        const {data} = await axios.delete(`http://localhost:4000/api/v1/project/deleteProject/${id}`, {
            withCredentials: true
        })

        dispatch(projectSlice.actions.deleteProjectSuccess(data))
        dispatch(projectSlice.actions.clearAllProjectErrors())
        
    }catch(err){
        dispatch(projectSlice.actions.deleteProjectFailed(err.response.data.message))
    }
};

export const clearAllErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllProjectErrors())
}

export const resetProjectSliceData = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice())
}

export default projectSlice.reducer;
