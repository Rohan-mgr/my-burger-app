import React from "react";
import classes from "./burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  let transformIngredients = Object.keys(props.ingredients)
    .map((ings) =>
      [...Array(props.ingredients[ings])].map((_, i) => {
        return <BurgerIngredients key={ings + i} ingsType={ings} />;
      })
    )
    .reduce((prevValue, nextValue) => prevValue.concat(nextValue), []);
  if (transformIngredients.length <= 0) {
    transformIngredients = (
      <p className={classes.UserGuideText}>Please fill in the Ingredients</p>
    );
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients ingsType="bread-top" />
      {transformIngredients}
      <BurgerIngredients ingsType="bread-bottom" />
    </div>
  );
};
export default Burger;
