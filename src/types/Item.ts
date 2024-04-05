export interface ItemAttribute {
    title: string,
    values: string[]
}

export interface ItemCardData {
    id: string,
    title: string,
    link: string,
    price: number,
    isAvailable: boolean,
    isPreorder: boolean,
}

export interface ItemCardCatalogData extends ItemCardData {
    attributes: ItemAttribute[]
}