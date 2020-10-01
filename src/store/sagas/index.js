import { take, takeEvery } from "redux-saga/effects";

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from "./auth";
import { initIngredientsSaga } from "./burgerbuilder";
import {
    purchaseBurgerSaga,
    fetchOrdersSaga
} from "./order";
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    //it s kinda like listeners
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_INITIIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield take(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}