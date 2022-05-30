import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import Button from "../../UI/Button/Button";

const BuildControls = props => {
    const controls = [
        {label: "Salad", type:"salad"},
        {label: "Bacon", type:"bacon"},
        {label: "Meat", type:"meat"},
        {label: "Cheese", type:"cheese"}
    ]
    return <div className={classes.BuildControls}>
        <p><strong>Burger Price: ${props.totalPrice}</strong></p>
        {controls.map(cntrl => {
        return (<BuildControl 
            key={cntrl.label}
            label={cntrl.label}
            clickedMore={() => props.addIngredients(cntrl.type)}
            clickedLess={() => props.removeIngredients(cntrl.type)}
            disableLessBtn={props.disableLess[cntrl.type]}
        />)})}
        <Button toggleBtn={props.totalPrice <= 0} handlerOrderSummary={props.orderSummaryFunc}>
            {props.isAuth ? "Order Now": "Sign Up To Order"}
        </Button>
    </div>
}
export default BuildControls;