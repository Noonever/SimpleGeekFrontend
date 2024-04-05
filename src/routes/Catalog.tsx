import { useEffect, useState } from "react";
import {
    Typography,


    Checkbox,
    Radio,

    Select,
    SelectChangeEvent,
    FormControl,

    TextField,

    List,
    ListItem,
    ListItemButton,

    MenuItem,

    Grid,
    Grow,

} from "@mui/material";

import { useLoaderData } from "react-router-dom";

import ItemCard from "../components/ItemCard";
import BreadcrumbsHeader from "../components/BreadcrumbsHeader";

import { getCatalog } from "../api/catalog";

import { useUser } from "../UserContext";

import type { ItemCardCatalogData } from "../types/Item";
import type { FilterGroup, CatalogCategory } from "../types/CatalogCategory";


function filterProductCards(
    productCards: ItemCardCatalogData[],
    categoryFilterGroups: FilterGroup[],
    selectedFiltersIndices: number[][],
    priceRange: [number, number],
): ItemCardCatalogData[] {
    let filteredProductCards = productCards
    const activeFilters: { [groupTitle: string]: string[] } = {}
    for (let groupIndex = 0; groupIndex < categoryFilterGroups.length; groupIndex++) {
        const selectedGroupIndices = selectedFiltersIndices.find((_, index) => index === groupIndex)
        if (selectedGroupIndices === undefined) {
            continue
        }
        const group = categoryFilterGroups[groupIndex]
        if (selectedGroupIndices.length > 0) {
            activeFilters[group.title] = group.filters
                .filter((_, index) => selectedGroupIndices.includes(index))
                .map((filter) => filter.value)
        }
    }
    console.warn(activeFilters)

    if (Object.keys(activeFilters).length > 0) {
        filteredProductCards = filteredProductCards
            .filter((productCard) => {
                const productAttributes = productCard.attributes
                const price = productCard.price

                if (price < priceRange[0] || price > priceRange[1]) {
                    return false
                }

                for (let i = 0; i < productAttributes.length; i++) {
                    const attribute = productAttributes[i]
                    if (activeFilters[attribute.title] !== undefined) {

                        for (let j = 0; j < attribute.values.length; j++) {
                            if (!activeFilters[attribute.title].includes(attribute.values[j])) {
                                return false
                            }
                        }
                    }
                }
                return true
            })
    }
    return filteredProductCards
};

export async function catalogLoader({ params }: any): Promise<CatalogCategory> {
    const categoryName = params.categoryName
    const catalogCategoryData = await getCatalog(categoryName)
    return catalogCategoryData
}

export default function Catalog() {
    console.log("catalog rendered");
    const collapsedFilterGroupSize = 5;
    const { state: userState, addToCart, toggleFavorite } = useUser();
    const { title, itemCards, filterGroups: loadedFilterGroups } = useLoaderData() as CatalogCategory;

    console.warn(userState)

    function getDefaultFiltersIndices() {
        const defaultFilterIndices = []
        for (let groupIndex = 0; groupIndex < loadedFilterGroups.length; groupIndex++) {
            for (let filterIndex = 0; filterIndex < loadedFilterGroups[groupIndex].filters.length; filterIndex++) {
                if (loadedFilterGroups[groupIndex].filters[filterIndex].isDefault) {
                    defaultFilterIndices.push([groupIndex, filterIndex])
                }
            }
        }
        return defaultFilterIndices
    };

    const [expandedFilterGroupsIndices, setExpandedFilterGroupsIndices] = useState<number[]>([]);
    const [selectedFiltersIndices, setSelectedFiltersIndices] = useState<number[][]>(getDefaultFiltersIndices());
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1010]);
    const [sorting, setSorting] = useState("exp")
    const [loadedIds, setLoadedIds] = useState<string[]>([]);

    const handleImageLoad = (id: string) => {
        if (!loadedIds.includes(id)) {
            setLoadedIds([...loadedIds, id])
        }
    }

    // useEffect(() => {
    //     const newItems = filterProductCards(
    //         itemCards, loadedFilterGroups, selectedFiltersIndices, priceRange
    //     )
    //     setItemsToRender([])
    //     setTimeout(() => { setItemsToRender(newItems) }, 0)

    // }, [itemCards, loadedFilterGroups, selectedFiltersIndices, priceRange])

    function handleChangeSorting(event: SelectChangeEvent) {
        setSorting(event.target.value)
    };

    function handleToggleFilter(groupIndex: number, filterIndex: number) {
        const newSelectedFilterIndices = [...selectedFiltersIndices]
        const selectedGroupIndices = newSelectedFilterIndices.find((_, index) => index === groupIndex)

        let newSelectedGroupIndices: number[] = []
        if (selectedGroupIndices !== undefined) {
            newSelectedGroupIndices = [...selectedGroupIndices]
        }
        const multiple = loadedFilterGroups[groupIndex].multiple

        if (multiple) {
            if (newSelectedGroupIndices.includes(filterIndex)) {
                newSelectedGroupIndices = newSelectedGroupIndices.filter((index) => index !== filterIndex)
            } else {
                newSelectedGroupIndices.push(filterIndex)
            }
        } else {
            newSelectedGroupIndices = [filterIndex]
        }

        newSelectedFilterIndices[groupIndex] = newSelectedGroupIndices
        setSelectedFiltersIndices(newSelectedFilterIndices)
    };

    function handleToggleFilterGroup(groupIndex: number) {
        let newExpandedFilterGroupsIndices = [...expandedFilterGroupsIndices]
        if (newExpandedFilterGroupsIndices.includes(groupIndex)) {
            newExpandedFilterGroupsIndices = newExpandedFilterGroupsIndices.filter((index) => index !== groupIndex)
        } else {
            newExpandedFilterGroupsIndices.push(groupIndex)
        }
        setExpandedFilterGroupsIndices(newExpandedFilterGroupsIndices)
    };

    function handleChangePriceRange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, price: "min" | "max") {
        let inputString = event.target.value
        if (!(/^\d+$/.test(inputString)) && inputString !== "") {
            return
        } else if (Number(inputString) < 0) {
            return
        }
        const newPriceRange: [number, number] = [...priceRange]
        newPriceRange[price === "min" ? 0 : 1] = Number(inputString)
        console.log(newPriceRange)
        setPriceRange(newPriceRange)
    };

    return (
        (<div>
            <BreadcrumbsHeader
                forwardable={[{
                    title: "Главная",
                    link: "/"
                },
                {
                    title: "Каталог",
                    link: "/catalog"
                }]}
                current={title}
            />


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16
            }}>
                <div style={{
                    width: 280,
                    height: "max-content",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                    padding: "16px 15px",
                    backgroundColor: "white",
                    borderRadius: 20,
                    gap: 24
                }}>
                    {loadedFilterGroups.map((group, groupIndex) => {
                        const groupFilters = group.filters
                        let selectedGroupIndices = selectedFiltersIndices.find((_, index) => index === groupIndex) || []

                        const expanded = expandedFilterGroupsIndices.includes(groupIndex)

                        let filtersToRender = []
                        if (expanded) {
                            filtersToRender = groupFilters
                        } else {
                            filtersToRender = groupFilters.slice(0, collapsedFilterGroupSize)
                        }

                        return (
                            <div key={group.title} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 12,
                            }}>
                                <Typography variant="h6">{group.title}</Typography>
                                <div>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 0 }}>
                                        {filtersToRender.map((filter, filterIndex) => {
                                            const filterId = `${group.title}-${filter.value}`
                                            const labelId = `filters-label-${filterId}`;
                                            const active = selectedGroupIndices.includes(filterIndex)

                                            return (
                                                <ListItem
                                                    key={filterId}
                                                    disablePadding
                                                >
                                                    <ListItemButton
                                                        role={undefined}
                                                        onClick={() => handleToggleFilter(groupIndex, filterIndex)}
                                                        sx={{ height: 42, padding: 0 }}
                                                    >
                                                        {
                                                            group.multiple
                                                                ? (
                                                                    <Checkbox
                                                                        checked={active}
                                                                        tabIndex={-1}
                                                                        disableRipple
                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                        color="warning"
                                                                    // sx={{
                                                                    //     width: 42,
                                                                    //     height: 42,
                                                                    // }}
                                                                    />
                                                                )
                                                                : <Radio
                                                                    checked={active}
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                    color="warning"
                                                                />
                                                        }
                                                        <Typography id={labelId} variant="body1">
                                                            {filter.value}
                                                        </Typography>
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                    {groupFilters.length > collapsedFilterGroupSize && (
                                        <Typography onClick={() => handleToggleFilterGroup(groupIndex)}>
                                            {`Показать все(${groupFilters.length})`}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12
                    }}>
                        <Typography variant="h6">Цена, ₽</Typography>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 8,
                            paddingTop: 8,
                        }}>
                            <TextField
                                variant="outlined"
                                label="от"
                                value={String(priceRange[0])}
                                onChange={(event) => handleChangePriceRange(event, "min")}
                            />
                            <TextField
                                variant="filled"
                                label="до"
                                value={String(priceRange[1])}
                                onChange={(event) => handleChangePriceRange(event, "max")}
                            />
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    width: "100%"
                }}>
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sorting}
                            onChange={handleChangeSorting}
                            defaultValue="exp"
                            autoWidth
                            sx={{
                                width: 360,
                                backgroundColor: 'surface.primary',
                            }}
                        >
                            <MenuItem value={'exp'}>Сначала дорогие</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container justifyContent="flex-start" spacing={2}>
                        {filterProductCards(
                            itemCards, loadedFilterGroups, selectedFiltersIndices, priceRange
                        ).map((itemData, index) => {
                            return (
                                <Grow key={index} in={loadedIds.includes(itemData.id)} timeout={(index + 2) * 300}>
                                    <Grid item xl={4} lg={4} md={6} key={index}>
                                        <ItemCard
                                            itemData={itemData}
                                            isInCart={userState.cart.some((cartItem) => cartItem.id === itemData.id)}
                                            isFavorite={userState.favorites.some((favoriteItem) => favoriteItem.id === itemData.id)}
                                            onAddToCart={addToCart}
                                            onToggleFavorite={toggleFavorite}
                                            onImageLoad={handleImageLoad}
                                        />
                                    </Grid>
                                </Grow >
                            )
                        })}
                    </Grid>
                </div>
            </div >
        </div>
        )
    );
};