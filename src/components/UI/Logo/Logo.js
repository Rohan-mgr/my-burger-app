import React from "react";
import logo from "../../../Assets/Images/burger-logo.png";
import classes from "../../Navigation/Toolbar/toolbar.css";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="burger logo" />
    </div>
  );
};
export default Logo;
