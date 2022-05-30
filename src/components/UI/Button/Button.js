import React from "react";
import classes from "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.handlerOrderSummary}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      disabled={props.toggleBtn}
    >
      {props.children}
    </button>
  );
};
export default Button;
