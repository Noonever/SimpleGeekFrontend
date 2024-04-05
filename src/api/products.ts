import { ItemCardCatalogData } from "../types/Item";
import { allItemCards } from "./mocked";

export function getItemCards(ids: string[]): Promise<ItemCardCatalogData[]> {
    return Promise.resolve(allItemCards.filter(item => ids.includes(item.id)))
}