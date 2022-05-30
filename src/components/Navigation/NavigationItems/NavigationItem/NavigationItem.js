import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.css";

const NavItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        onClick={props.closingBackdrop}
        className={({ isActive }) => (isActive ? classes.active_link : "")}>
        {props.children}
      </NavLink>
    </li>
  );
};
export default NavItem;
