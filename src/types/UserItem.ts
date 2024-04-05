export interface UserItem {
    id: string;
}

export interface UserCartItem extends UserItem {
    quantity: number;
}