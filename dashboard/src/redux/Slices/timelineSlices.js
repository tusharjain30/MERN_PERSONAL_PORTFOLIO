import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name: "timeline",
    initialState: {
        loading: false,
        error: null,
        message: null,
        timelines: [],
    },
    reducers: {
        addNewTimelineRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        addNewTimelineSuccess(state, action){
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        addNewTimelineFailed(state, action){
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        getAllTimeLineRequest(state, action){
            state.loading = true
            state.error = null
            state.message = null
        },
        getAllTimeLineSuccess(state, action){
            state.timelines = action.payload
            state.loading = false
            state.error = null
            state.message = null
        },
        getAllTimeLineFailed(state, action){
            state.timelines = []
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        deleteTimelineRequest(state, action){
            state.loading = false
            state.message = null
            state.error = null
        },
        deleteTimelineSuccess(state, action){
            state.loading = false
            state.message = action.payload
            state.error = null
        },
        deleteTimelineFailed(state, action){
            state.loading = false
            state.message = null
            state.error = action.payload
        },
        resetTimelineSlice(state, action){
            state.message = null
            state.error = null
            state.timelines = state.timelines
        },
        clearTimelineSliceErrors(state, action){
            state.error = null
            state.timelines = state.timelines
        },
    }
});

export const addNewTimeline = (newData) => async(dispatch) => {
    dispatch(timelineSlice.actions.addNewTimelineRequest())
    try{

        const {data} = await axios.post("http://localhost:4000/api/v1/timeline/sendTimeline", newData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        dispatch(timelineSlice.actions.addNewTimelineSuccess(data.message))
        dispatch(timelineSlice.actions.clearTimelineSliceErrors())

    }catch(err){
        dispatch(timelineSlice.actions.addNewTimelineFailed(err.response.data.message))
    }
};

export const getAllTimelines = () => async(dispatch) => {
    dispatch(timelineSlice.actions.getAllTimeLineRequest())
    try{

        const {data} = await axios.get("http://localhost:4000/api/v1/timeline/getTimelines", {
            withCredentials: true
        })
        dispatch(timelineSlice.actions.getAllTimeLineSuccess(data.timelines))
        dispatch(timelineSlice.actions.clearTimelineSliceErrors())
    }catch(err){
        dispatch(timelineSlice.actions.getAllTimeLineFailed(err.response.data.message))
    }
}

export const deleteTimeline = (id) => async(dispatch) => {
    dispatch(timelineSlice.actions.deleteTimelineRequest())
    try{

        const {data} = await axios.delete(`http://localhost:4000/api/v1/timeline/deleteTimeline/${id}`, {
            withCredentials: true
        })
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message))
        dispatch(timelineSlice.actions.clearTimelineSliceErrors())
    }catch(err){
        dispatch(timelineSlice.actions.deleteTimelineFailed(err.response.data.message))
    }
}

export const clearAllTimelineErrors = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearTimelineSliceErrors())
};

export const resetTimelinesSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice())
};


export default timelineSlice.reducer