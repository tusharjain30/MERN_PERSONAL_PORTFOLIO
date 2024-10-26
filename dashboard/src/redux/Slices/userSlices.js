import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlices = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
    },
    reducers: {
        loginRequest(state, action) {
            state.loading = true
            state.isAuthenticated = false
            state.user = {}
            state.error = null
            state.message = null
        },
        loginSuccess(state, action) {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.error = null
            state.message = action.payload.message
        },
        loginFailed(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = {}
            state.error = action.payload
            state.message = null
        },
        logoutRequest(state, action) {
            state.loading = true
            state.isAuthenticated = true
            state.user = state.user
            state.error = null
            state.message = null
        },
        logoutSuccess(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = {}
            state.error = null
            state.message = action.payload.message
        },
        logoutFailed(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = {}
            state.error = action.payload
            state.message = null
        },
        loadUserRequest(state, action) {
            state.loading = true
            state.isAuthenticated = false
            state.user = {}
            state.error = null
        },
        loadUserSuccess(state, action) {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.error = null
        },
        loadUserFailed(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = {}
            state.error = action.payload
        },
        userProfileUpdateRequest(state, action) {
            state.loading = true,
            state.error = null
        },
        userProfileUpdateSuccess(state, action) {
            state.loading = false,
            state.error = null,
            state.message = action.payload.message
            state.user = action.payload.updatedUserProfile
        },
        userProfileUpdateFailed(state, action) {
            state.loading = false,
            state.error = action.payload,
            state.user = state.user
        },
        userUpdatePasswordRequest(state, action) {
            state.loading = true,
            state.error = null
        },
        userUpdatePasswordSuccess(state, action) {
            state.loading = false,
            state.error = null,
            state.message = action.payload.message
        },
        userUpdatePasswordFailed(state, action) {
            state.loading = false,
            state.error = action.payload,
            state.user = state.user
        },
        forgotPasswordRequest(state, action){
            state.loading = true
            state.message = null
            state.error = null
        },
        forgotPasswordSuccess(state, action){
            state.loading = false
            state.message = action.payload
            state.error = null
        },
        forgotPasswordFailed(state, action){
            state.loading = false
            state.message = null
            state.error = action.payload
        },
        resetPasswordRequest(state, action) {
            state.loading = true
            state.isAuthenticated = false
            state.user = {}
            state.error = null
            state.message = null
        },
        resetPasswordSuccess(state, action) {
            state.loading = false
            state.isAuthenticated = true
            state.user = action.payload.user
            state.error = null
            state.message = action.payload.message
        },
        resetPasswordFailed(state, action) {
            state.loading = false
            state.isAuthenticated = false
            state.user = {}
            state.error = action.payload
            state.message = null
        },
        userResetSlice(state, action) {
            state.error = null
            state.message = null
            state.isAuthenticated = state.isAuthenticated
            state.user = state.user
        },
        userClearErrors(state, action) {
            state.error = null
            state.isAuthenticated = state.isAuthenticated
            state.user = state.user
        }
    }
});

export const login = (email, password) => async (dispatch) => {
    dispatch(userSlices.actions.loginRequest())
    try {
        const { data } = await axios.post("http://localhost:4000/api/v1/user/login", { email, password }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        dispatch(userSlices.actions.loginSuccess(data))
        dispatch(userSlices.actions.userClearErrors())
    } catch (err) {
        dispatch(userSlices.actions.loginFailed(err.response.data.message))
    }
};

export const getUser = () => async (dispatch) => {
    dispatch(userSlices.actions.loadUserRequest())
    try {

        const { data } = await axios.get("http://localhost:4000/api/v1/user/getUser", {
            withCredentials: true
        })

        dispatch(userSlices.actions.loadUserSuccess(data))
        dispatch(userSlices.actions.userClearErrors())

    } catch (err) {
        dispatch(userSlices.actions.loadUserFailed(err.response.data.message))
    }
};

export const logout = () => async (dispatch) => {
    dispatch(userSlices.actions.logoutRequest())
    try {

        const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true })
        dispatch(userSlices.actions.logoutSuccess(data))
        dispatch(userSlices.actions.userClearErrors())

    } catch (err) {
        dispatch(userSlices.actions.logoutFailed(err.response.data.message))
    }
};

export const updateProfile = (updatedData) => async (dispatch) => {
    dispatch(userSlices.actions.userProfileUpdateRequest())
    try {

        const { data } = await axios.put("http://localhost:4000/api/v1/user/updateProfile", updatedData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })

        dispatch(userSlices.actions.userProfileUpdateSuccess(data))
        dispatch(userSlices.actions.userClearErrors())

    } catch (err) {
        dispatch(userSlices.actions.userProfileUpdateFailed(err.response.data.message))
    }
}

export const updatePassword = (updatedData) => async (dispatch) => {
    dispatch(userSlices.actions.userUpdatePasswordRequest())
    try {

        const { data } = await axios.put("http://localhost:4000/api/v1/user/updatePassword", updatedData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        dispatch(userSlices.actions.userUpdatePasswordSuccess(data))
        dispatch(userSlices.actions.userClearErrors())

    } catch (err) {
        dispatch(userSlices.actions.userUpdatePasswordFailed(err.response.data.message))
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    dispatch(userSlices.actions.forgotPasswordRequest())
    try {

        const { data } = await axios.post("http://localhost:4000/api/v1/user/password/forgotPassword", {email}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        dispatch(userSlices.actions.forgotPasswordSuccess(data.message))
        dispatch(userSlices.actions.userClearErrors())

    } catch (err) {
        dispatch(userSlices.actions.forgotPasswordFailed(err.response.data.message))
    }
};

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(userSlices.actions.resetPasswordRequest())
    try {
        const { data } = await axios.put(`http://localhost:4000/api/v1/user/password/reset/${token}`, { password, confirmPassword }, {
            withCredentials: true
        })
        dispatch(userSlices.actions.resetPasswordSuccess(data))
        dispatch(userSlices.actions.userClearErrors())
    } catch (err) {
        dispatch(userSlices.actions.resetPasswordFailed(err.response.data.message))
    }
};

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlices.actions.userClearErrors())
};

export const resetUserSlice = () => (dispatch) => {
    dispatch(userSlices.actions.userResetSlice())
};

export default userSlices.reducer;