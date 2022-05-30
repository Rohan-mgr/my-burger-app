import React, { useState, useEffect } from "react";
import Burger from "../components/burger/burger";
import BuildControls from "../components/burger/BuildControls/BuildControls";
import axios from "../axios-ings";
import withErrorHandler from "./Hoc/withErrorHandler/withErrorHandler";
import Spinner from "../components/UI/Spinner/Spinner";
import Aux from "./Hoc/Auxiliary";
import OrderSummary from "../components/burger/OrderSummary/OrderSummary";
import Modal from "../components/UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/action/index";

const BurgerBuilder = (props) => {
  const navigate = useNavigate();
  const [showOrderSummary, setOrderSummary] = useState(false);

  useEffect(() => {
    // axios.get("/ingredients.json").then(res => {
    //   console.log(res.data);
    //   setLoading(false);
    //   // return setIngredients(res.data);
    // }).catch(err => {
    //   return setLoading(false)});
    props.onInitIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const disableInfo = {
    ...props.ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  const orderSummaryHandler = () => {
    if (props.isAuthenticated) {
      setOrderSummary((prevState) => !prevState);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      navigate("auth");
    }
  };
  const closeOrderSummary = () => {
    return setOrderSummary((prevState) => !prevState);
  };
  const ContinueOrderHandler = () => {
    props.onInitPurchase();
    navigate("checkout");
  };
  let orderSummary = null;
  let burger = props.error ? (
    <p style={{ textAlign: "center", fontWeight: "bold" }}>
      Ingredients Can't Be Fetched !
    </p>
  ) : (
    <Spinner />
  );
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          addIngredients={props.onAddIngredients}
          removeIngredients={props.onRemoveIngredients}
          disableLess={disableInfo}
          totalPrice={props.price.toFixed(2)}
          orderSummaryFunc={orderSummaryHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        totalPrice={props.price.toFixed(2)}
        closeOrder={closeOrderSummary}
        continueHandler={ContinueOrderHandler}
      />
    );
  }

  return (
    <div>
      <Modal
        showBackdrop={showOrderSummary}
        BackdropHandler={closeOrderSummary}
      >
        {orderSummary}
      </Modal>
      {burger}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredients: (ingName) => dispatch(actions.addIngredients(ingName)),
    onRemoveIngredients: (ingName) =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.initPurchase()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
