import React from "react";
import classes from "./order.css";

const Order = (props) => {
  const ingredients = [];
  for (let igName in props.ingredients) {
    ingredients.push({
      name: igName,
      amount: props.ingredients[igName],
    });
  }
  const igOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          margin: "0 5px",
          padding: "5px",
          border: "1px solid #ccc",
          display: "inline-block",
        }}>
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {igOutput}</p>
      <p>
        Price:
        <strong> USD {props.price}</strong>
      </p>
    </div>
  );
};
export default Order;
