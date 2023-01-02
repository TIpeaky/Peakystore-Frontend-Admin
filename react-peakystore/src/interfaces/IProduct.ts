export interface IProduct {
    [x: string]: any
    id : string
    sku : string
    name : string
    description : string
    purchasePrice : number
    salePrice : number
    stockQuantity : number
    productBrand : string
    lastUpdateDate : string
    color : string
    size : string
    category : string
    section : string
    images : File[]
}
