import { IProduct } from "./IProduct"
import { IPurchase } from './IPurchase'

export interface ICartItem {
    id : string
    quantity : number
    product : IProduct
    totalPrice : number
    purchase : IPurchase
}