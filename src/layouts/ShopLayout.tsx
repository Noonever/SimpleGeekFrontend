import Header from "../components/Header";
import Footer from "../components/Footer";
import UserAuthCard from "../components/UserAuth";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { useUser } from "../UserContext";
import { useState } from "react";


export default function ShopLayout() {
    const navigate = useNavigate()
    const { state: userState, setup: setupUser } = useUser();
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {isOpened &&
                <UserAuthCard
                    isOpened={isOpened}
                    onClose={() => setIsOpened(false)}
                    onLoggedIn={() => { setupUser(); setIsOpened(false) }}
                    onRegistered={() => { setupUser(); setIsOpened(false) }}
                    onPasswordForgotClick={() => {
                        setIsOpened(false)
                        navigate('/recover')
                    }}
                />}
            <Header userState={userState} onLoginClick={() => setIsOpened(true)} />

            <Box sx={{
                paddingLeft: "calc(48/1920 * 100%)",
                paddingRight: "calc(48/1920 * 100%)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexGrow: 1,
                backgroundColor: "surface.secondary",
            }}>
                <div style={{
                    flexGrow: 1,
                    padding: "32px 0 28px 0",
                    maxWidth: `calc(1392/1920 * 1920px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: "100%"

                }}>
                    <Outlet />
                </div>
            </Box>

            <Footer />
        </div>
    );
}