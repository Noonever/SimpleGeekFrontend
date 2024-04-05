import { Session } from "@ory/client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { oryApi, oryApiErrorHandler } from "../oryApi"

export default function Profile() {
    const [session, setSession] = useState<Session | null>(null)
    const [logoutUrl, setLogoutUrl] = useState<string>()

    const navigate = useNavigate()
    const sdkErrorHandler = oryApiErrorHandler(undefined, undefined, "/login")

    const createLogoutFlow = () => {
        // here we create a new logout URL which we can use to log the user out
        oryApi
            .createBrowserLogoutFlow(undefined, {
                params: {
                    return_url: "/",
                },
            })
            .then(({ data }) => setLogoutUrl(data.logout_url))
            .catch(sdkErrorHandler)
    }

    useEffect(() => {
        // we check if the user is logged in by checking if there is a session
        // if no session is found, we redirect to the login page
        oryApi
            .toSession()
            .then(({ data: session }) => {
                // we set the session data which contains the user Identifier and other traits.
                setSession(session)
                // Set logout flow
                createLogoutFlow()
            })
            .catch(sdkErrorHandler)
            .catch((error) => {
                // Handle all other errors like error.message "network error" if Kratos can not be connected etc.
                if (error.message) {
                    return navigate(`/error?error=${encodeURIComponent(error.message)}`, {
                        replace: true,
                    })
                }

                // Just stringify error and print all data
                navigate(`/error?error=${encodeURIComponent(JSON.stringify(error))}`, {
                    replace: true,
                })
            })
    }, [])

    return (
        <>
            {session ? (
                <>{JSON.stringify(session)}</>
            ): navigate('/login?return_to=profile')}
        </>
    )
}
