import * as actionTypes from "./actionTypes";
import axios from "../../axios-ings";

export const addIngredients = name => {
    return {
        type: actionTypes.ADD_INGREDIENTS, 
        ingName: name,
    }
}

export const removeIngredients = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS, 
        ingName: name,
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS, 
        ingredients: ingredients,
    }
}

export const fetchError = () => {
    return {
        type: actionTypes.FETCH_ERROR,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json").then(res => {
            return dispatch(setIngredients(res.data))}
        ).catch(err => {
            console.log(err);
            return dispatch(fetchError());
        })
    }
}

