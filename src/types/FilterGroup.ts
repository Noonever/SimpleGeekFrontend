export type Filter = {
    value: string
    isDefault: boolean
}

export type FilterGroup = {
    title: string,
    multiple: boolean,
    filters: Filter[]
}