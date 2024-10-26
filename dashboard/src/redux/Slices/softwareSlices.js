import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        loading: false,
        message: null,
        error: null,
        applications: []
    },
    reducers: {
        addNewAppRequest(state, action){
            state.loading = true
            state.message = null
            state.error = null
        },
        addNewAppSuccess(state, action){
            state.loading = false
            state.message = action.payload
            state.error = null
        },
        addNewAppFailed(state, action){
            state.loading = false
            state.message = null
            state.error = action.payload
        },
        getAllSoftwareRequest(state, action){
            state.loading = true
            state.message = null
            state.error = null
        },
        getAllSoftwareSuccess(state, action){
            state.loading = false
            state.applications = action.payload
            state.message = null
            state.error = null
        },
        getAllSoftwareFailed(state, action){
            state.loading = false
            state.message = null
            state.error = action.payload
            state.applications = []
        },
        deleteSoftwareRequest(state, action){
            state.loading = true
            state.message = null
            state.error = null
        },
        deleteSoftwareSuccess(state, action){
            state.loading = false
            state.message = action.payload.message
            state.error = null
        },
        deleteSoftwareFailed(state, action){
            state.error = action.payload
            state.loading = false
            state.message = null
        },
        clearApplicationErrors(state, action){
            state.error = null
            state.applications = state.applications
        },
        resetApplicationSlice(state, action){
            state.error = null
            state.message = null
            state.applications = state.applications
        },
    }
});

export const addNewApplication = (newData) => async(dispatch) => {
    dispatch(applicationSlice.actions.addNewAppRequest())
    try{

        const {data} = await axios.post("http://localhost:4000/api/v1/app/createApp", newData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch(applicationSlice.actions.addNewAppSuccess(data.message))
        dispatch(applicationSlice.actions.clearApplicationErrors())

    }catch(err){
        dispatch(applicationSlice.actions.addNewAppFailed(err.response.data.message))
    }
}

export const getAllApplication = () => async(dispatch) => {
    dispatch(applicationSlice.actions.getAllSoftwareRequest())
    try{

        const {data} = await axios.get("http://localhost:4000/api/v1/app/getApps", {
            withCredentials: true
        })

        dispatch(applicationSlice.actions.getAllSoftwareSuccess(data.applications))
        dispatch(applicationSlice.actions.clearApplicationErrors())

    }catch(err){
        dispatch(applicationSlice.actions.getAllSoftwareFailed(err.response.data.message))
    }
}

export const deleteApplication = (id) => async(dispatch) => {
    dispatch(applicationSlice.actions.deleteSoftwareRequest())
    try{

        const {data} = await axios.delete(`http://localhost:4000/api/v1/app/deleteApp/${id}`, {
            withCredentials: true
        })

        dispatch(applicationSlice.actions.deleteSoftwareSuccess(data))
        dispatch(applicationSlice.actions.clearApplicationErrors())

    }catch(err){
        dispatch(applicationSlice.actions.deleteSoftwareFailed(err.response.data.message))
    }
}

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(applicationSlice.actions.clearApplicationErrors())
}

export const resetAllApplicationSlice = () => (dispatch) => {
    dispatch(applicationSlice.actions.resetApplicationSlice())
}

export default applicationSlice.reducer