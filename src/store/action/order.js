import axios from "../../axios-ings";
import * as actionTypes from "../action/actionTypes";

export const startBurgerPurchase = () => {
    return {
        type: actionTypes.START_BURGER_PURCHASE, 
    }
}

export const initFetchOrder = () => {
    return {
        type: actionTypes.INIT_FETCH_ORDER,
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE,
    }
}

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderId: id, 
        orderData: orderData,
    }
}
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS, 
        order: orders, 
    }
}
export const fetchOrderFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILURE, 
        error:error,
    }
}
export const burgerPurchaseFailure = (error) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAILURE, 
        error: error,
    }
}

export const initBurgerPurchase = (orderData, token) => {
    return dispatch => {
        dispatch(startBurgerPurchase());
        axios.post("/order.json?auth=" + token, orderData)
        .then(res => dispatch(burgerPurchaseSuccess(res.data.name, orderData)))
        .catch(err => dispatch(burgerPurchaseFailure(err)));
    }
}

export const startFetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(initFetchOrder());
        const query = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("/order.json" + query)
        .then(res => {
            return dispatch(fetchOrderSuccess(res.data))})
        .catch(err => dispatch(fetchOrderFailure(err)));
    }
}