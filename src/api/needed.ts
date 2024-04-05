import axios, { AxiosError, AxiosInstance } from "axios"

const shopApi: AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
})


interface UserItem {
    id: string;
}
interface UserCartItem extends UserItem {
    quantity: number;
}
interface UserItemsUpdate {
    cart?: UserCartItem[],
    favorites?: UserItem[],
    notificated?: UserItem[],
}

async function updateUserItems(items: UserItemsUpdate) {
    await shopApi.post("/user/items", items)
}

interface ItemAttribute {
    title: string,
    values: string[]
}
interface ItemCard {
    id: string,
    title: string,
    link: string,
    price: number,
    isAvailable: boolean,
    isPreorder: boolean,
}
interface ItemCardCatalog extends ItemCard {
    attributes: ItemAttribute[]
}
interface Filter {
    value: string,
    isDefault: boolean
}
interface FilterGroup {
    title: string,
    multiple: boolean,
    filters: Filter[]
}
interface CatalogCategory {
    title: string,
    itemCards: ItemCardCatalog[],
    filterGroups: FilterGroup[],
}

async function getCatalog(categoryName: string): Promise<CatalogCategory | null> {
    try {
        const response = await shopApi.get(`/catalog/${categoryName}`)
        return response.data
    } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
            return null
        } else {
            if ((error as AxiosError).message) {
                console.error((error as AxiosError).message)
            }
            return null
        }
    }
}

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

async function formCart(cart: UserCartItem[]): Promise<FormedCart | null> {
    try {
        const response = await shopApi.post("/cart", { cart })
        return response.data
    } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
            return null
        } else {
            if ((error as AxiosError).message) {
                console.error((error as AxiosError).message)
            }
            return null
        }
    }
}

async function getItemCards(itemIds: string[]): Promise<ItemCard[]> {
    try {
        const response = await shopApi.post("/item/cards", { itemIds })
        return response.data
    } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
            return []
        } else {
            if ((error as AxiosError).message) {
                console.error((error as AxiosError).message)
            }
            return []
        }
    }
}
