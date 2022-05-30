import React from "react"; 
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.css";
import Aux from "../../../container/Hoc/Auxiliary";

const OrderSummary = props => {
    return (
        <Aux>
            <h2>Your Order</h2>
            <p>A Delicious Burger with the following Ingredients: </p>
            <ul className={classes.Ul}>
                {Object.keys(props.ingredients).map(ing => <li 
                key={ing}>{ing}: {props.ingredients[ing]}</li>)}
            </ul>
            <p><strong>Total Price:{props.totalPrice}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" handlerOrderSummary={props.closeOrder}>Cancel</Button>
            <Button btnType="Success" handlerOrderSummary={props.continueHandler}>Continue</Button>
        </Aux>
    )
}
export default OrderSummary;