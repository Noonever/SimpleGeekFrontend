import type { ItemCardCatalogData } from "../types/Item";

export const minifiguresItems: ItemCardCatalogData[] = [
    {
        id: "f1",
        title: "Фигурка1",
        link: "figurka1",
        price: 1001,
        isAvailable: true,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Коллекция",
                values: ["DC"]
            },
            {
                title: "Цвет",
                values: ["Красный"]
            }
        ]
    },
    {
        id: "f2",
        title: "Фигурка2",
        link: "figurka2",
        price: 1002,
        isAvailable: false,
        isPreorder: true,
        attributes: [
            {
                title: "Наличие",
                values: ["Предзаказ"]
            },
            {
                title: "Коллекция",
                values: ["DC"]
            },
            {
                title: "Цвет",
                values: ["Красный"]
            }
        ]
    },
    {
        id: "f3",
        title: "Фигурка3",
        link: "figurka3",
        price: 1003,
        isAvailable: false,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Коллекция",
                values: ["DC"]
            },
            {
                title: "Цвет",
                values: ["Белый"]
            }
        ]
    },
    {
        id: "f4",
        title: "Фигурка4",
        link: "figurka4",
        price: 1004,
        isAvailable: true,
        isPreorder: true,
        attributes: [
            {
                title: "Наличие",
                values: ["Предзаказ"]
            },
            {
                title: "Коллекция",
                values: ["Marvel"]
            },
            {
                title: "Цвет",
                values: ["Красный"]
            }
        ]
    },
    {
        id: "f5",
        title: "Фигурка5",
        link: "figurka5",
        price: 1005,
        isAvailable: true,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Коллекция",
                values: ["Marvel"]
            },
            {
                title: "Цвет",
                values: ["Красный"]
            }
        ]
    }
]

export const vinylItems: ItemCardCatalogData[] = [
    {
        id: "v1",
        title: "Винил1",
        link: "vinyl1",
        price: 1001,
        isAvailable: true,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Производитель",
                values: ["Black Clover"]
            },
            {
                title: "Год",
                values: ["2022"]
            }
        ]
    },
    {
        id: "v2",
        title: "Винил2",
        link: "vinyl2",
        price: 1002,
        isAvailable: false,
        isPreorder: true,
        attributes: [
            {
                title: "Наличие",
                values: ["Предзаказ"]
            },
            {
                title: "Производитель",
                values: ["Black Clover"]
            },
            {
                title: "Год",
                values: ["2022"]
            }
        ]
    },
    {
        id: "v3",
        title: "Винил3",
        link: "vinyl3",
        price: 1003,
        isAvailable: true,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Производитель",
                values: ["Doraemon"]
            },
            {
                title: "Год",
                values: ["2021"]
            }
        ]
    },
    {
        id: "v4",
        title: "Винил4",
        link: "vinyl4",
        price: 1004,
        isAvailable: true,
        isPreorder: true,
        attributes: [
            {
                title: "Наличие",
                values: ["Предзаказ"]
            },
            {
                title: "Производитель",
                values: ["Doraemon"]
            },
            {
                title: "Год",
                values: ["2021"]
            }
        ]
    },
    {
        id: "v5",
        title: "Винил5",
        link: "vinyl5",
        price: 1005,
        isAvailable: true,
        isPreorder: false,
        attributes: [
            {
                title: "Наличие",
                values: ["В наличии"]
            },
            {
                title: "Производитель",
                values: ["Doraemon"]
            },
            {
                title: "Год",
                values: ["2021"]
            }
        ]
    }
]

export const allItemCards = [...vinylItems, ...minifiguresItems]