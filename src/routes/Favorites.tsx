import { useLoaderData } from "react-router-dom"
import { getItemCards } from "../api/products"
import { ItemCardData } from "../types/Item"
import { Divider, Grid, Grow, Typography } from "@mui/material"
import ItemCard from "../components/ItemCard"
import { Favorite as FavoriteIcon } from "@mui/icons-material"
import usePageTitle from "../hooks/usePageTitle"
import { useUser } from "../UserContext"
import { UserCartItem, UserItem } from "../types/UserItem"
import { useState } from "react"

interface LoaderData {
    favorites: ItemCardData[]
}

export async function favoritesLoader(items: UserItem[]): Promise<LoaderData> {
    const favoriteIds = items.map((item) => item.id)
    const products = await getItemCards(favoriteIds)
    return {
        favorites: products
    }
}

interface ItemGridProps {
    items: ItemCardData[],
    onAddToCart: (id: string) => void,
    onToggleFavorite: (id: string) => void,
    favorites: UserItem[],
    cart: UserCartItem[]
}

const ItemGrid = ({
    items,
    onAddToCart,
    onToggleFavorite,
    favorites,
    cart
}: ItemGridProps) => {
    const [loadedIds, setLoadedIds] = useState<string[]>([])

    return (
        <Grid container justifyContent="flex-start" spacing={2}>
            {items.map((data, index) => (
                <Grow key={index} in={loadedIds.includes(data.id)} timeout={(index + 2) * 300}>
                    <Grid item xl={3} lg={4} md={6} key={index}>
                        <ItemCard
                            itemData={data}
                            isFavorite={favorites.some((item) => item.id === data.id)}
                            isInCart={cart.some((item) => item.id === data.id)}
                            onAddToCart={onAddToCart}
                            onToggleFavorite={onToggleFavorite}
                            onImageLoad={() => setLoadedIds((prev) => [...prev, data.id])}
                        />
                    </Grid>
                </Grow>
            ))}
        </Grid>
    )
}


export default function Favorites(props: { pageTitle: string }) {

    usePageTitle(props.pageTitle)
    const { state: userState, addToCart, toggleFavorite } = useUser();
    const { favorites } = useLoaderData() as LoaderData

    const availableProducts = favorites.filter(item => item.isAvailable)
    const unavailableProducts = favorites.filter(item => !item.isAvailable)

    return (
        <>
            <div style={{
                paddingTop: 16,
                paddingBottom: 16,
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                gap: 16
            }}>
                <Typography sx={{ verticalAlign: "baseline" }} variant="h3">
                    Избранное
                </Typography>
                <Typography color={"typography.secondary"} variant="body1">
                    {userState.favorites.length} товаров
                </Typography>
            </div>

            {availableProducts.length > 0 && (
                <div style={{
                    padding: "24px 0px",
                }}>
                    <ItemGrid
                        items={availableProducts}
                        onAddToCart={addToCart}
                        onToggleFavorite={toggleFavorite}
                        favorites={userState.favorites}
                        cart={userState.cart}
                    />
                </div>
            )}
            {availableProducts.length > 0 && unavailableProducts.length > 0 && (
                <Divider sx={{ color: 'divider' }} />
            )}
            {unavailableProducts.length > 0 && (
                <>
                    <Typography variant="h5" style={{ paddingTop: 24 }}>
                        Недоступны для заказа
                    </Typography>
                    <div style={{
                        padding: "24px 0px",
                    }}>
                        <ItemGrid
                            items={unavailableProducts}
                            onAddToCart={addToCart}
                            onToggleFavorite={toggleFavorite}
                            favorites={userState.favorites}
                            cart={userState.cart}
                        />
                    </div>
                </>
            )}
            {
                availableProducts.length === 0 && unavailableProducts.length === 0 && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 600,
                        width: "100%",
                        height: "100%",
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: 310,
                            gap: 16,
                        }}>
                            <FavoriteIcon sx={{
                                width: 91,
                                height: 91,
                                color: "icon.tetriary",
                            }} />
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Typography variant="h6">
                                    В избранном ничего нет
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: "center", color: 'typography.secondary' }}>
                                    Добавляйте сюда понравившиеся товары. Для этого жмите на сердечко в карточке товара
                                </Typography>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}