import React, { useState } from "react";
import Toolbar from "../../components/Navigation/Toolbar/toolbar";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import classes from "./layout.css";
import {connect} from 'react-redux';

const Layout = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const drawerToggleHandler = () => {
    setShowSidebar(prevState => prevState);
  };
  const closeBackdropHandler = () => {
    setShowSidebar(prevState => !prevState);
  };
  return (
    <div className={classes.layout}>
      <header>
        <Toolbar isAuth = {props.isAuthenticated} Click={drawerToggleHandler} />
        <Sidebar isAuth = {props.isAuthenticated} open={showSidebar} close={closeBackdropHandler} />
      </header>
      <main>{props.children}</main>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}
export default connect(mapStateToProps)(Layout);
