import React from "react";
import classes from "./DrawerToggle.css";

const DrawerToggle = (props) => {
  return (
    <div className={classes.Hamburger} onClick={props.Clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default DrawerToggle;
