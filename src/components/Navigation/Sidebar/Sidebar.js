import React from "react";
import classes from "./Sidebar.css";
import NavItems from "../NavigationItems/NavigationItems";
import Logo from "../../UI/Logo/Logo";
import Aux from "../../../container/Hoc/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidebar = (props) => {
  const sideDrawerClasses = [
    classes.Sidebar,
    props.open ? classes.OpenSidebar : classes.CloseSidebar,
  ];
  return (
    <Aux>
      <Backdrop show={props.open} closeBackdrop={props.close} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuthenticated = {props.isAuth} closeBackdrop={props.close} />
        </nav>
      </div>
    </Aux>
  );
};
export default Sidebar;
