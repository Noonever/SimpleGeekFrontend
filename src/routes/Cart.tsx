import { useLoaderData } from "react-router-dom"
import usePageTitle from "../hooks/usePageTitle"
import { UserCartItem } from "../types/UserItem"
import { ItemCardData } from "../types/Item"
import { getItemCards } from "../api/products"
import { Box, Button, Checkbox, Divider, Grid, Grow, IconButton, Typography, styled } from "@mui/material"
import { useUser } from "../UserContext"
import { Add, Delete, Favorite, FavoriteBorder, Remove, ShoppingCart } from "@mui/icons-material"
import { useState } from "react"
import { getImageLink } from "../utils/image"

interface CartPreOrder {
    title: string,
    expectedDate: string,
    items: UserCartItem[],
}
interface FormedCart {
    stock: UserCartItem[],
    preOrders: CartPreOrder[],
    unavailable: UserCartItem[],
}

interface CartLoaderData {
    cart: FormedCart,
    itemCards: ItemCardData[],
}

export async function cartLoader(items: UserCartItem[]): Promise<CartLoaderData> {
    const allIds = items.map(item => item.id)
    const mockedCart: FormedCart = {
        stock: [],
        preOrders: [
            {
                title: "Предзаказ 1",
                expectedDate: "10.10.2024",
                items: [],
            }
        ],
        unavailable: [],
    }
    const itemCards = await getItemCards(allIds)
    for (const itemCard of itemCards) {
        if (itemCard.isAvailable) {
            if (itemCard.isPreorder) {
                mockedCart.preOrders[0].items.push(items.find(item => item.id === itemCard.id))
            } else {
                mockedCart.stock.push(items.find(item => item.id === itemCard.id))
            }
        } else {
            mockedCart.unavailable.push(items.find(item => item.id === itemCard.id))
        }
    }
    if (mockedCart.preOrders[0].items.length === 0) {
        mockedCart.preOrders = []
    }
    return {
        cart: mockedCart,
        itemCards
    }
}

interface CartSectionHeaderProps {
    checked: boolean,
    onCheck: () => void,
    onDeleteAll: () => void,
}

const CartSectionHeader = ({ checked, onCheck, onDeleteAll }: CartSectionHeaderProps) => {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
            }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Checkbox checked={checked} onChange={onCheck} />
                    <Typography variant="body1">
                        Выбрать все
                    </Typography>
                </div>
                <Button variant="text" onClick={onDeleteAll}>
                    <Typography color='warning.main' variant="body1">
                        Удалить все
                    </Typography>
                </Button>
            </div>
        </>
    )
}

const CartSectionWrapper = styled('div')({
    display: "flex",
    flexDirection: "row",
    gap: 16
})

const CartSectionItemsWrapper = styled('div')({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "16px 24px 24px 24px",
    backgroundColor: "white",
    borderRadius: 24,
    width: "100%",
})

interface CartItemProps {
    data: ItemCardData,
    isFavorite: boolean,
    quantity: number,
    checked: boolean,
    onCheck: () => void,
    onFavoriteClick: (id: string) => void,
    onDelete: (id: string) => void,
    onIncrement: (id: string) => void,
    onDecrement: (id: string) => void,

}

const CartItem = ({ data, isFavorite, quantity, checked, onCheck, onFavoriteClick, onDelete, onIncrement, onDecrement }: CartItemProps) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 8
            }}>
                <Checkbox checked={checked} onChange={onCheck} />

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 16,
                    overflow: "hidden",
                }}>
                    <img src={getImageLink(data.link)} style={{ width: 100, height: 100 }} />
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        paddingLeft: 8
                    }}>
                        <Typography variant="body2">
                            {data.title}
                        </Typography>

                        {data.isAvailable ? (
                            data.isPreorder ? (
                                <Typography color="typography.secondary" variant="body2">
                                    Доступно для предзаказа
                                </Typography>
                            ) : (
                                <Typography color="typography.success" variant="body2">
                                    В наличии
                                </Typography>
                            )
                        ) : (
                            <Typography color="typography.attention" variant="body2">
                                Нет в наличии
                            </Typography>
                        )}
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8
                    }}>
                        <IconButton onClick={() => onFavoriteClick(data.id)}>
                            {isFavorite ? <Favorite sx={{ color: "icon.attention" }} /> : <FavoriteBorder color="secondary" />}
                        </IconButton>
                        <IconButton onClick={() => onDelete(data.id)}>
                            <Delete />
                        </IconButton>
                    </div>
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "end",
            }}>
                <Typography variant="subtitle1">
                    {data.price} ₽
                </Typography>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    gap={"8px"}
                    width={"136px"}
                    borderRadius={"8px"}
                    sx={{
                        backgroundColor: "surface.secondary",
                    }}
                >
                    <IconButton onClick={() => onDecrement(data.id)}>
                        <Remove />
                    </IconButton>
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}>
                        <Typography variant="subtitle2">
                            {quantity}
                        </Typography>
                    </Box>

                    <IconButton onClick={() => onIncrement(data.id)}>
                        <Add />
                    </IconButton>
                </Box>
            </div>
        </div>
    )
}

export default function Cart(props: { pageTitle: string }) {
    usePageTitle(props.pageTitle)
    const { state: userState, toggleFavorite, deleteCartItem, incrementCartItem, decrementCartItem } = useUser()
    const { cart, itemCards } = useLoaderData() as CartLoaderData
    const [checkedStock, setCheckedStock] = useState<string[]>([])
    const [checkedPreOrders, setCheckedPreOrders] = useState<string[][]>(cart.preOrders.map(() => []))
    const [checkedUnavailable, setCheckedUnavailable] = useState<string[]>([])

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
                    Корзина
                </Typography>
                <Typography color={"typography.secondary"} variant="body1">
                    {userState.cart.length} товаров
                </Typography>
            </div>
            {
                cart.stock.length > 0 && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}>
                        <Typography variant="h5">
                            В наличии
                        </Typography>
                        <CartSectionWrapper>
                            <CartSectionItemsWrapper>
                                <CartSectionHeader
                                    checked={checkedStock.length === cart.stock.length}
                                    onCheck={() => {
                                        if (checkedStock.length === cart.stock.length) {
                                            setCheckedStock([])
                                        } else {
                                            setCheckedStock(cart.stock.map(item => item.id))
                                        }
                                    }}
                                    onDeleteAll={() => {

                                    }}
                                />
                                {cart.stock.map((item, index) => {
                                    const itemData = itemCards.find(card => card.id === item.id)
                                    return (
                                        <Grow key={index} in timeout={(index + 1) * 300}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                                <Divider></Divider>
                                                <CartItem
                                                    key={index}
                                                    data={itemData}
                                                    isFavorite={userState.favorites.some((item) => item.id === itemData?.id)}
                                                    quantity={item.quantity}
                                                    checked={checkedStock.includes(item.id)}
                                                    onCheck={() => { checkedStock.includes(item.id) ? setCheckedStock(checkedStock.filter(id => id !== item.id)) : setCheckedStock([...checkedStock, item.id]) }}
                                                    onFavoriteClick={toggleFavorite}
                                                    onDelete={deleteCartItem}
                                                    onIncrement={incrementCartItem}
                                                    onDecrement={decrementCartItem}
                                                />
                                            </div>
                                        </Grow>
                                    )
                                })}
                            </CartSectionItemsWrapper>
                        </CartSectionWrapper>
                    </div>
                )
            }
            {
                cart.preOrders.length > 0 && (
                    cart.preOrders.map((preOrder, preOrderIndex) => {
                        const checkedItems = checkedPreOrders[preOrderIndex] || []
                        return (
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8
                                }}>
                                    <Typography variant="h6">
                                        {preOrder.title}
                                    </Typography>
                                    <div>
                                        <Typography color="typography.secondary" variant="typography.subtitle1">
                                            На складе ожидается:
                                        </Typography>
                                        <Typography variant="typography.subtitle1">
                                            {preOrder.expectedDate}
                                        </Typography>
                                    </div>
                                </div>

                                <CartSectionWrapper>
                                    <CartSectionItemsWrapper>
                                        <CartSectionHeader
                                            checked={checkedItems.length === preOrder.items.length}
                                            onCheck={() => { setCheckedPreOrders([...checkedPreOrders.slice(0, preOrderIndex), checkedItems.length === preOrder.items.length ? [] : preOrder.items.map(item => item.id)]) }}
                                            onDeleteAll={() => { }}
                                        />

                                        {preOrder.items.map((item, itemIndex) => {
                                            const itemData = itemCards.find(card => card.id === item.id)
                                            return (
                                                <Grow key={itemIndex} in timeout={(itemIndex + 1) * 300}>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                                        <Divider></Divider>
                                                        <CartItem
                                                            key={itemIndex}
                                                            data={itemData}
                                                            isFavorite={userState.favorites.some((item) => item.id === itemData?.id)}
                                                            quantity={item.quantity}
                                                            checked={checkedItems.includes(item.id)}
                                                            onCheck={() => { setCheckedPreOrders([...checkedPreOrders.slice(0, preOrderIndex), checkedItems.includes(item.id) ? checkedItems.filter(id => id !== item.id) : [...checkedItems, item.id]]) }}
                                                            onFavoriteClick={toggleFavorite}
                                                            onDelete={deleteCartItem}
                                                            onIncrement={incrementCartItem}
                                                            onDecrement={decrementCartItem}
                                                        />
                                                    </div>
                                                </Grow>
                                            )
                                        })}
                                    </CartSectionItemsWrapper>
                                </CartSectionWrapper>
                            </div>
                        )
                    }
                    ))
            }
            {
                itemCards.length === 0 && (
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
                            <ShoppingCart sx={{
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
                                    В корзине ничего нет
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