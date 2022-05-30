import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./container/layout/layout";
import BurgerBuilder from "./container/BurgerBuilder";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/action/index";
import withRouter from "./container/Hoc/withRouter";

const AsyncCheckout = React.lazy(() => import("./container/Checkout/Checkout"));
const AsyncOrder = React.lazy(() => import("./container/Order/Order"));

function App(props) {
  useEffect(() => {
    props.onTryAutoSignUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let routes = (
    <Routes>
      <Route path="/" element={<BurgerBuilder />} />
      <Route path="/auth" element={<Auth />} />
      {props.isAuthenticated && (
        <>
          <Route
            path="/orders"
            element={
              <Suspense fallback={<div>loading...</div>}>
                <AsyncOrder />
              </Suspense>
            }
          />
          <Route
            path="/checkout/*"
            element={
              <Suspense fallback={<div>loading...</div>}>
                <AsyncCheckout />
              </Suspense>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </>
      )}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthStatus()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
