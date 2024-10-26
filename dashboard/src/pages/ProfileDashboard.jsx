import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TopBar from './sub-components/TopBar'
import Profile from './sub-components/Profile'
import UpdateProfile from './sub-components/UpdateProfile'
import UpdatePassword from './sub-components/UpdatePassword'

const ProfileDashboard = () => {

    const [active, setActive] = useState("Profile")

    return (
        <>
            <TopBar />
            <main className="mt-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground font-semibold" x-chunk="dashboard-04-chunk-0"
                    >
                        <h1 className={`cursor-pointer ${active == "Profile" ? "font-bold text-primary" : ""}`} onClick={() => setActive("Profile")}>Profile</h1>
                        <h1 className={`cursor-pointer font-bold ${active == "UpdateProfile" ? "font-bold text-primary" : ""}`} onClick={() => setActive("UpdateProfile")}>Update Profile</h1>
                        <h1 className={`cursor-pointer font-bold ${active == "UpdatePassword" ? "font-bold text-primary" : ""}`} onClick={() => setActive("UpdatePassword")}>Update Password</h1>
                    </nav>
                    <div className="grid gap-6">
                        {
                            (() => {
                                switch (active) {

                                    case "UpdateProfile": {
                                        return <UpdateProfile />
                                        break
                                    }

                                    case "UpdatePassword": {
                                        return <UpdatePassword />
                                        break
                                    }

                                    default: {
                                        return <Profile />
                                        break
                                    }
                                }
                            })()
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfileDashboard
