import * as actionTypes from "../action/actionTypes";


const individualPrice={
    salad: 9.54, 
    bacon: 5.60, 
    meat: 12, 
    cheese: 15,
  }
const initialState = {
    ingredients: null,
    totalPrice: 0.00,
    error: false,
    building: false, 
}

const addIngredients = (state, action) => {
    return {
        ...state, 
        ingredients: {
            ...state.ingredients, 
            [action.ingName]: state.ingredients[action.ingName] + 1,
        }, 
        totalPrice: state.totalPrice + individualPrice[action.ingName],
        building: true,
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: 
            return addIngredients(state, action);
            case actionTypes.REMOVE_INGREDIENTS: 
            return {
                ...state, 
                ingredients: {
                    ...state.ingredients, 
                    [action.ingName]: state.ingredients[action.ingName] - 1,
                },
                totalPrice: state.totalPrice - individualPrice[action.ingName],
                building: true,
            }
            case actionTypes.SET_INGREDIENTS: 
            return {
                ...state, 
                ingredients: action.ingredients,
                totalPrice: 0.00,
                error: false,
                building: false, 
            }
            case actionTypes.FETCH_ERROR: 
            return {
                ...state, 
                error: true,
            }
        default: 
            return state;
    }
}
export default reducer;