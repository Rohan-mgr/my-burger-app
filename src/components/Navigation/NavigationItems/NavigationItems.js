import React from "react";
import NavItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem closingBackdrop={props.closeBackdrop} link="/">
        Burger
      </NavItem>
      {props.isAuthenticated ? <NavItem closingBackdrop={props.closeBackdrop} link="/orders">
        Orders
      </NavItem> : null }
      {!props.isAuthenticated ?
        <NavItem closingBackdrop={props.closeBackdrop} link="/auth">
          Authenticate
        </NavItem>
        : <NavItem closingBackdrop={props.closeBackdrop} link="/logout">
            Logout
         </NavItem>}
    </ul>
  );
};
export default NavItems;
