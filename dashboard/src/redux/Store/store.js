import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlices";
import projectReducer from "../Slices/projectSlices";
import skillReducer from "../Slices/skillSlice";
import applicationReducer from "../Slices/softwareSlices";
import timelineReducer from "../Slices/timelineSlices";
import MessageReducer from "../Slices/MessageSlices";

const store = configureStore({
    reducer: {
        user: userReducer,
        project: projectReducer,
        skill: skillReducer,
        application: applicationReducer,
        timeline: timelineReducer,
        message: MessageReducer
    }
})

export default store