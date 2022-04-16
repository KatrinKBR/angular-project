/* import { MovieDetails } from "src/app/models/movie";
import { CartAction, CartActionTypes } from "../actions/cart.actions";

export const initialState: Array<MovieDetails> = []

export function CartReducer(state: Array<MovieDetails> = initialState, action: CartAction) {
    switch(action.type){
        case CartActionTypes.ADD_ITEM:
            return [...state, action.payload]
        default:
            return state
    }
} */

import { createReducer, on } from "@ngrx/store";
import { CartItem } from "src/app/models/cartItem";
import * as actions from "../actions/cart.actions"

export const initialState: Array<CartItem> = []

export const cartReducer = createReducer(
    initialState,
    on(actions.addItemCart, (state, {payload}) => { return [...state, payload] }),
    on(actions.deleteItemCart, (state, {payload}) => { return state.filter(item => item !== payload) })
)