import { IconButton, Typography } from "@mui/material";
import { FavoriteBorder, Favorite, AddShoppingCart, ShoppingCart, NotificationAdd } from "@mui/icons-material";

import { ItemCardData } from "../types/Item";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { getImageLink } from "../utils/image";
import ImageComponent from "./ImageComponent";

interface ItemCardProps {
    itemData: ItemCardData,
    isFavorite: boolean,
    isInCart: boolean,
    isNotificated?: boolean,
    onAddToCart: (id: string) => void,
    onToggleFavorite: (id: string) => void,
    onImageLoad: (id: string) => void
}

export default function ItemCard({
    itemData,
    isFavorite,
    isInCart,
    onAddToCart,
    onToggleFavorite,
    onImageLoad
}: ItemCardProps) {
    const navigate = useNavigate();

    function handleAddToCart() {
        onAddToCart(itemData.id);
    }

    function handleAddToFavorites() {
        onToggleFavorite(itemData.id);
    }

    return (
        <Box
            onClick={() => navigate(`/product/${itemData.link}`)}
            sx={{
                padding: "8px 8px 16px 8px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                height: 420,
                borderRadius: "16px",
                transition: "all 0.2s",
                '&:hover': {
                    backgroundColor: "white",
                    boxShadow: "0px 6px 21px - 7px rgba(0, 0, 0, 0.75)"
                }
            }}
        >
            <div style={{
                width: "100%",
                height: 300,
                backgroundColor: "none",
                borderRadius: 16,
                display: "flex",
                justifyContent: "center",
                overflow: "hidden",
            }}>
                <ImageComponent
                    src={getImageLink(itemData.link)}
                    style={{ width: "100%", height: "auto", borderRadius: 16 }}
                    onLoad={() => onImageLoad(itemData.id)}
                />
            </div>
            <div style={{
                padding: "0px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
            }}>
                {itemData.isAvailable ? (
                    <>
                        {itemData.isPreorder ? (
                            <Typography variant="body2" color="typography.success">
                                Доступно для предзаказа
                            </Typography>
                        ) : (
                            <Typography variant="body2" color="typography.success">
                                В наличии
                            </Typography>
                        )}
                    </>
                ) : (
                    <Typography variant="body2" color="typography.attention">
                        Нет в наличии
                    </Typography>
                )}

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Typography variant="h6">
                            {itemData.price} ₽
                        </Typography>
                        <div>
                            <Typography variant="body1" style={{
                                maxWidth: 205.33,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                                {itemData.title}
                            </Typography>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "max-content",
                        gap: 8,
                    }}>
                        <IconButton onClick={(event) => {
                            handleAddToFavorites();
                            event.stopPropagation();
                        }} style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                        }}>
                            {isFavorite ? <Favorite sx={{ color: "icon.attention" }} /> : <FavoriteBorder color="secondary" />}
                        </IconButton>
                        <IconButton onClick={(event) => {
                            isInCart? navigate('/cart'):
                            itemData.isAvailable ? handleAddToCart() : alert("Товар отсутствует в наличии");
                            event.stopPropagation();
                        }} style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                        }}
                            sx={{
                                backgroundColor: itemData.isAvailable ? "primary.main" : "surface.tertiary",
                                cursor: itemData.isAvailable ? "pointer" : "default",
                                '&:hover': {
                                    backgroundColor: itemData.isAvailable ? "primary.dark" : "surface.tertiary",
                                },
                            }}
                        >   {itemData.isAvailable
                            ? (
                                isInCart ? <ShoppingCart sx={{ color: "icon.primary" }} /> : <AddShoppingCart sx={{ color: "icon.primary" }} />
                            ) : (
                                <NotificationAdd sx={{ color: "icon.tertiary" }} />
                            )}

                        </IconButton>
                    </div>
                </div>
            </div>
        </Box >
    )
};