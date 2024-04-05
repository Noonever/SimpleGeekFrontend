import { Typography, styled } from "@mui/material"

import logo from '../assets/logo.png';
import vkIcon from '../assets/vk.svg';
import { useNavigate } from "react-router-dom";

const FooterSection = styled('div')({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
})

const FooterSection16 = styled(FooterSection)({
    gap: 16,
})

const FooterSection8 = styled(FooterSection)({
    gap: 8,
})

const TypographyClickable = styled(Typography)({
    cursor: "pointer",
})

const SocialIcon = styled('img')({
    cursor: "pointer",
    height: 32,
})

export default function Footer() {

    const navigate = useNavigate()

    return (
        <div style={{
            padding: `0 calc(24/1920 * 100%)`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white"
        }}>
            <footer style={{
                flexGrow: 1,
                paddingTop: 48,
                paddingBottom: 80,
                maxWidth: 1408,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 32
            }}>
                <FooterSection8>
                    <Typography variant="h4">
                        email@mail.ru
                    </Typography>
                    <Typography variant="body1">
                        Если у вас остались вопросы
                    </Typography>
                </FooterSection8>

                <FooterSection16>
                    <Typography variant="h6">
                        Покупателям
                    </Typography>
                    <TypographyClickable onClick={() => navigate("/catalog")} variant="body2">
                        Каталог
                    </TypographyClickable>
                    <TypographyClickable onClick={() => navigate("/faq")} variant="body2">
                        FUCK
                    </TypographyClickable>
                </FooterSection16>

                <FooterSection16>
                    <Typography variant="h5">
                        Мы в социальных сетях
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <SocialIcon src={vkIcon} alt="vk" onClick={() => window.open("https://vk.com/simplegeeek")} />
                    </div>
                </FooterSection16>
                <FooterSection8>
                    <div style={{ width: 103.75, height: 56 }}>
                        <img src={logo} height={56} alt='logo' />
                    </div>
                    <Typography variant="body1">
                        © 2024 Simple Geek. Все права защищены
                    </Typography>
                </FooterSection8>
            </footer>
        </div>
    )
}