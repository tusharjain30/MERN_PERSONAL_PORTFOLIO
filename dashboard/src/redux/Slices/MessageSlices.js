import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const messageSlice = createSlice({
    name: "message",
    initialState: {
        loading: false,
        messages: [],
        error: null,
        message: null
    },
    reducers: {
        loadMessageRequest(state, action){
            state.loading = true
            state.messages = []
            state.error = null
        },
        loadMessageSuccess(state, action){
            state.loading = false
            state.messages = action.payload.allMessages
            state.error = null
        },
        loadMessageFailed(state, action){
            state.loading = false
            state.messages = []
            state.error = action.payload
        },
        deleteMessageRequest(state, action){
            state.loading = true
            state.messages = state.messages
            state.error = null
        },
        deleteMessageSuccess(state, action){
            state.loading = false
            state.messages = action.payload.allMessages
            state.message = action.payload.message
            state.error = null
        },
        deleteMessageFailed(state, action){
            state.loading = false
            state.messages = []
            state.error = action.payload
        },
        clearMessageSliceErrors(state, action){
            state.error = null
            state.messages = state.messages 
        },
        resetMessageSlice(state, action){
            state.error = null
            state.message = null
            state.messages = state.messages 
        },
    }
});

export const getAllMessages = () => async(dispatch) => {
    dispatch(messageSlice.actions.loadMessageRequest())
    try{

        const {data} = await axios.get("http://localhost:4000/api/v1/message/getAllMessages", {
            withCredentials: true
        })

        dispatch(messageSlice.actions.loadMessageSuccess(data))
        dispatch(messageSlice.actions.clearMessageSliceErrors())

    }catch(error){
        dispatch(messageSlice.actions.loadMessageFailed(error.response.data.message))
    }
}

export const deleteMessages = (id) => async(dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest())
    try{

        const {data} = await axios.delete(`http://localhost:4000/api/v1/message/deleteMessage/${id}`, {
            withCredentials: true
        })

        dispatch(messageSlice.actions.deleteMessageSuccess(data))
        dispatch(messageSlice.actions.clearMessageSliceErrors())

    }catch(error){
        dispatch(messageSlice.actions.deleteMessageFailed(error.response.data.message))
    }
}

export const clearAllMessageSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.clearMessageSliceErrors())
}

export const resetAllMessageSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice())
}

export default messageSlice.reducer