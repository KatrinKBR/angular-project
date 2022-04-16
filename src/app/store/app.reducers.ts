import { ActionReducerMap } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { User } from "../models/user";
import { cartReducer } from "./reducers/cart.reducers";

export interface AppState {
    cart: Array<CartItem>,
}

export const appReducers: ActionReducerMap<AppState> = {
    cart: cartReducer
}