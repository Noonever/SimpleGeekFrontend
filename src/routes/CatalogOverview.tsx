import { styled, useTheme } from "@mui/material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import minifiguresSectionBig from "../assets/minifiguresSectionBig.jpg";
import vynylSectionBig from "../assets/vynylSectionBig.jpg";
import usePageTitle from "../hooks/usePageTitle";


export default function CatalogOverview(props: { pageTitle: string }) {

    usePageTitle(props.pageTitle)

    const theme = useTheme()
    const navigate = useNavigate()

    const FunctionalLink = styled(RouterLink)({
        textDecoration: "none",
        color: "inherit"
    })

    const CatalogSectionWrapper = styled('div')({
        width: 696,
        height: 300,
        borderRadius: 16,
        position: 'relative',
        cursor: 'pointer',
        transition: "transform .2s",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        overflowX: "hidden",
        '&:hover': {
            transform: "scale(1.02)",
        }
    })

    const SectionTypographyWrapper = styled('div')({
        position: 'absolute',
        top: 237,
        left: "50%",
        transform: "translateX(-50%)",
    })

    return (
        <>
            <div style={{
                paddingTop: 16,
                paddingBottom: 32,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%"
            }}>
                <Breadcrumbs>
                    <FunctionalLink to="/">
                        <Link color="inherit" underline="hover">
                            Главная
                        </Link>
                    </FunctionalLink>

                    <FunctionalLink to="/catalog">
                        <Link color={theme.palette.text.primary} underline="hover">
                            Каталог
                        </Link>
                    </FunctionalLink>

                </Breadcrumbs>
                <Typography variant="h3">
                    Каталог
                </Typography>
            </div>
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 16
                }}>
                    <CatalogSectionWrapper onClick={() => navigate("/catalog/minifigures")}>
                        <img style={{height: 300}} src={minifiguresSectionBig} />
                        <SectionTypographyWrapper>
                            <Typography variant="h4" color="white">
                                Фигурки
                            </Typography>
                        </SectionTypographyWrapper>
                    </CatalogSectionWrapper>

                    <CatalogSectionWrapper onClick={() => navigate("/catalog/vinyl")}>
                        <img src={vynylSectionBig} />
                        <SectionTypographyWrapper>
                            <Typography variant="h4" color="white">
                                Винил
                            </Typography>
                        </SectionTypographyWrapper>
                    </CatalogSectionWrapper>
                </div>
            </div>
        </>
    )
}
