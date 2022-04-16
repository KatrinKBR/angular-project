/* import { Action } from "@ngrx/store";
import { MovieDetails } from "src/app/models/movie";

export enum CartActionTypes {
    ADD_ITEM = '[Cart] Add to cart',
    DELETE_ITEM = '[Cart] Delete from cart',
}

export class AddCartItem implements Action {
    readonly type = CartActionTypes.ADD_ITEM;
    constructor(public payload: MovieDetails) {}
}

export class DeleteCart implements Action {
    readonly type = ActionTypes.DELETE;
    constructor(public payload: MovieDetails) {}
}
export type CartAction = AddCartItem | DeleteCart; */

import { createAction, props } from "@ngrx/store";
import { CartItem } from "src/app/models/cartItem";

export const loadCart = createAction('[Cart] Load cart');

export const addItemCart = createAction(
    '[Cart] Add to cart',
    props<{ payload: CartItem }>()
);

export const deleteItemCart = createAction(
    '[Cart] Delete from cart',
    props<{ payload: CartItem }>()
);