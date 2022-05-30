import * as actionTypes from "../action/actionTypes";

const initialState = {
    order: [],
    loading: false,
    purchased: false,
}
const initPurchase = (state) => {
    return {
        ...state, 
        purchased: false,
    }
}
const initFetchOrder = (state) => {
    return {
        ...state, 
        loading: true,
    }
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData, 
        id: action.orderId,
    }
    return {
        ...state, 
        purchased: true,
        loading: false,
        order: state.order.concat(newOrder),
    }
}
const fetchOrderSuccess = (state, action) => {
    return {
        ...state, 
        order: action.order,
        loading: false,
    }
}
const fetchOrderFailure = (state, action) => {
    return {
        ...state, 
        loading: false,
    }
}
const purchaseBurgerFailure = (state) => {
    return {
        ...state, 
        loading: false,
    }
}
const purchaseBurgerStart = (state) => {
    return {
        ...state, 
        loading: true,
    }
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.INIT_FETCH_ORDER: 
            return initFetchOrder(state);
        case actionTypes.FETCH_ORDER_SUCCESS: 
            return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAILURE: 
            return fetchOrderFailure(state, action);
        case actionTypes.INIT_PURCHASE: 
            return initPurchase(state);
        case actionTypes.START_BURGER_PURCHASE: 
            return purchaseBurgerStart(state);
        case actionTypes.BURGER_PURCHASE_SUCCESS: 
            return purchaseBurgerSuccess(state, action);
        case actionTypes.BURGER_PURCHASE_FAILURE: 
            return purchaseBurgerFailure(state);
        default: 
        return state;
    }
}
export default orderReducer;
