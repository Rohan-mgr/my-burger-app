import React from "react";
import classes from "./BurgerIngredients.css";

const BurgerIngredients = (props) => {
  let ingredients = null;
  switch (props.ingsType) {
    case "bread-top":
      ingredients = <div className={classes.bread_top}></div>;
      break;
    case "bread-bottom":
      ingredients = <div className={classes.bread_bottom}></div>;
      break;
    case "salad":
      ingredients = <div className={classes.salad}></div>;
      break;
    case "bacon":
      ingredients = <div className={classes.bacon}></div>;
      break;
    case "meat":
      ingredients = <div className={classes.meat}></div>;
      break;
    case "cheese":
      ingredients = <div className={classes.cheese}></div>;
      break;
    default:
      ingredients = null;
      break;
  }
  return ingredients;
};
export default BurgerIngredients;
