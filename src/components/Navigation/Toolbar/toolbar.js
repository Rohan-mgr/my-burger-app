import React from "react";
import NavItems from "../NavigationItems/NavigationItems";
import classes from "./toolbar.css";
import DrawerToggle from "../Sidebar/DrawerToggle/DrawerToggle";
import Logo from "../../UI/Logo/Logo";

const Toolbar = (props) => {
  return (
    <div className={classes.toolbar}>
      <DrawerToggle Clicked={props.Click} />
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes.desktopOnly}>
        <NavItems isAuthenticated = {props.isAuth} />
      </nav>
    </div>
  );
};
export default Toolbar;
