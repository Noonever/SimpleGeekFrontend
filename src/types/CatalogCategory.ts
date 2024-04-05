import { ItemCardCatalogData } from "./Item"

export interface Filter {
    value: string,
    isDefault: boolean
}

export interface FilterGroup {
    title: string,
    multiple: boolean,
    filters: Filter[]
}

export interface CatalogCategory {
    title: string,
    itemCards: ItemCardCatalogData[],
    filterGroups: FilterGroup[],
}
