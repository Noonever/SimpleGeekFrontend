import { Link as RouterLink, useLoaderData } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
    Typography,

    Link,
    Breadcrumbs,

    Checkbox,
    Radio,

    Select,
    SelectChangeEvent,
    FormControl,

    TextField,

    List,
    ListItem,
    ListItemButton,

    MenuItem,

    Grid,

    styled,
    Button,
    IconButton,
} from "@mui/material";
import BreadcrumbsHeader from "../components/BreadcrumbsHeader";
import usePageTitle from "../hooks/usePageTitle";
import { Favorite } from "@mui/icons-material";

import { ShowcaseCarousel } from "../components/ShowcaseCarousel";

import image1 from "../assets/test1.png"
import image2 from "../assets/test2.png"
import image3 from "../assets/test3.png"
import image4 from "../assets/test4.png"


export default function Product() {
    usePageTitle('kik')
    const [productImageIndex, setProductImageIndex] = useState(0)

    const BaseContainer = styled('div')({
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingTop: 24,
        paddingBottom: 24,
    })

    const images = [
        <img style={{width: "100%" }} src={image1} />,
        <img style={{width: "100%" }} src={image2} />,
        <img style={{width: "100%" }} src={image3} />,
        <img style={{width: "100%" }} src={image4} />,
    ]


    return (
        <>
            <BreadcrumbsHeader
                forwardable={[
                    {
                        title: "Главная",
                        link: "/",
                    },
                    {
                        title: "Каталог",
                        link: "/catalog",
                    }
                ]}
                current="Товар"
            ></BreadcrumbsHeader>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 24,
                paddingBottom: 24,
            }}>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 624,
                    gap: 16
                }}>
                    <ShowcaseCarousel showWindowHeight={528} showWindowWidth={624} itemsToShow={4} height={160} itemWidth={160} gap={8} transistionTime={500} items={images} />
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 360,
                    gap: 16,
                    backgroundColor: 'pink'
                }}>
                    <Typography variant="h5">О товаре</Typography>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="body1" color='typography.secondary'>Цена:</Typography>
                        <Typography variant="body1">123123</Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="body1" color='typography.secondary'>Цена:</Typography>
                        <Typography variant="body1">123123</Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="body1" color='typography.secondary'>Цена:</Typography>
                        <Typography variant="body1">123123</Typography>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="body1" color='typography.secondary'>Цена:</Typography>
                        <Typography variant="body1">123123</Typography>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    width: 360,
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        padding: 16,
                        borderRadius: 16,
                        backgroundColor: "white",
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                        }}>
                            <Typography variant="h4">99 999</Typography>
                            <Typography variant="body1" color={"typography.success"}>В наличии</Typography>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                        }}>
                            <Button variant="contained" size="large">Добавить в корзину</Button>
                            <IconButton>
                                <Favorite />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}