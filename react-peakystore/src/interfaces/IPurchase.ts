import { IUser } from "./IUser"
import { IAddress } from "./IAddress"
import { ICartItem } from "./ICartItem"

export interface IPurchase {
    id : string
    orderMadeDateTime : string
    paymentConfirmedDateTime : string
    orderDispatchedDateTime : string
    orderDeliveredDateTime : string
    orderReturnedDateTime : string
    totalValue : number
    payment : string
    status : string
    isDelivered : boolean
    user : IUser
    cartItemList : ICartItem[]
    deliveryAddress : IAddress
}