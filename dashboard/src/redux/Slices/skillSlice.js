import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        error: null,
        message: null,
        skills: [],
    },
    reducers: {
        addNewSkillRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        addNewSkillSuccess(state, action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        addNewSkillFailed(state, action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        getAllSkillsRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        getAllSkillsSuccess(state, action){
            state.loading = false
            state.skills = action.payload
            state.error = null
            state.message = null
        },
        getAllSkillsFailed(state, action){
            state.loading = false
            state.skills = []
            state.error = action.payload
            state.message = null
        },
        updateSkillRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        updateSkillSuccess(state, action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        updateSkillFailed(state, action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        deleteSkillRequest(state, action){
            state.loading = true
            state.message = null
            state.error = null
        },
        deleteSkillSuccess(state, action){
            state.loading = false
            state.message = action.payload
            state.error = null
        },
        deleteSkillFailed(state, action){
            state.loading = false
            state.message = null
            state.error = action.payload
        },
        resetSkillSlice(state, action){
            state.message = null
            state.error = null
            state.skills = state.skills
        },
        clearSkillSliceErrors(state, action){
            state.error = null
            state.skills = state.skills
        },
    }
});

export const addNewSkill = (newData) => async(dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest())
    try{

        const {data} = await axios.post("http://localhost:4000/api/v1/skill/createSkill", newData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch(skillSlice.actions.addNewSkillSuccess(data.message))
        dispatch(skillSlice.actions.clearSkillSliceErrors())

    }catch(err){
        dispatch(skillSlice.actions.addNewSkillFailed(err.response.data.message))
    }
};

export const getAllSkills = () => async(dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest())
    try{

        const {data} = await axios.get("http://localhost:4000/api/v1/skill/getAllSkills", {
            withCredentials: true
        })

        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills))
        dispatch(skillSlice.actions.clearSkillSliceErrors())

    }catch(err){
        dispatch(skillSlice.actions.getAllSkillsFailed(err.response.data.message))
    }
};

export const deleteSkill = (id) => async(dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest())
    try{

        const {data} = await axios.delete(`http://localhost:4000/api/v1/skill/deleteSkill/${id}`, {
            withCredentials: true
        })

        dispatch(skillSlice.actions.deleteSkillSuccess(data.message))
        dispatch(skillSlice.actions.clearSkillSliceErrors())

    }catch(err){
        dispatch(skillSlice.actions.deleteSkillFailed(err.response.data.message))
    }
};

export const updateSkill = (id, proficiency) => async(dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest())
    try{

        const {data} = await axios.put(`http://localhost:4000/api/v1/skill/updateSkill/${id}`, {proficiency}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        dispatch(skillSlice.actions.updateSkillSuccess(data.message))
        dispatch(skillSlice.actions.clearSkillSliceErrors())

    }catch(err){
        dispatch(skillSlice.actions.updateSkillFailed(err.response.data.message))
    }
};

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearSkillSliceErrors())
};

export const resetSkillsSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice())
};


export default skillSlice.reducer