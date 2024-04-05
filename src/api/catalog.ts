import type { CatalogCategory } from "../types/CatalogCategory";
import type { FilterGroup } from "../types/FilterGroup";
import { minifiguresItems, vinylItems } from "./mocked";

export function getCatalog(categoryName: string): Promise<CatalogCategory>  {

    const baseFilters: FilterGroup[] = [
        {
            title: "Наличие",
            multiple: false,
            filters: [
                {
                    value: "В наличии",
                    isDefault: true
                },
                {
                    value: "Предзаказ",
                    isDefault: false
                }
            ]
        }
    ]

    const minifiguresAddFilters: FilterGroup[] = [
        {
            title: "Коллекция",
            multiple: true,
            filters: [
                {
                    value: "DC",
                    isDefault: false
                },
                {
                    value: "Marvel",
                    isDefault: false
                }
            ]
        },
        {
            title: "Цвет",
            multiple: true,
            filters: [
                {
                    value: "Белый",
                    isDefault: false
                },
                {
                    value: "Красный",
                    isDefault: false
                }
            ]
        }
    ]

    const vinylAddFilters: FilterGroup[] = [
        {
            title: "Год",
            multiple: true,
            filters: [
                {
                    value: "2022",
                    isDefault: true
                },
                {
                    value: "2021",
                    isDefault: false
                }
            ]
        },
        {
            title: "Производитель",
            multiple: true,
            filters: [
                {
                    value: "Black Clover",
                    isDefault: false
                },
                {
                    value: "Doraemon",
                    isDefault: false
                }
            ]
        }
    ]

    const vinylFilters = baseFilters.concat(vinylAddFilters)
    const minifiguresFilters = baseFilters.concat(minifiguresAddFilters)
    
    const categoryDataSamples: { [key: string]: CatalogCategory } = {
        "minifigures": {
            title: "Фигурки",
            itemCards: minifiguresItems,
            filterGroups: minifiguresFilters
        },
        "vinyl": {
            title: "Винил",
            itemCards: vinylItems,
            filterGroups: vinylFilters
        },
    }

    if (!Object.keys(categoryDataSamples).includes(categoryName)) {
        throw new Response("Not found", { status: 404 });
    }
    return new Promise(resolve => setTimeout(() => resolve(categoryDataSamples[categoryName]), 500))
}   