import React, {Suspense} from "react"; 
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import Button from "../../components/UI/Button/Button";
import classes from "./Checkout.css";
import Burger from "../../components/burger/burger";

const AsyncContactData = React.lazy(() => import("./ContactData/ContactData"));

const Checkout = props => {
    const navigate=useNavigate();
    const checkoutContinueHandler = () => {
        navigate("contact-data", {replace: true});
    }
    const checkoutCancelHandler = () => {
        navigate("/", {replace: true});
    }

    let burger = props.ings ? <Burger ingredients={props.ings} /> : <Navigate to="/" replace />;
    let purchaseRedirect = props.purchased ? <Navigate to="/" /> : null;
    return <div className={classes.Checkout}>
        {purchaseRedirect}
        <h1>Hope your Burger Taste Well :)</h1>
        {burger}
        <Button btnType="Danger" handlerOrderSummary={checkoutCancelHandler}>Cancel</Button>
        <Button btnType="Success" handlerOrderSummary={checkoutContinueHandler}>Continue</Button>
        <Routes>
            <Route path="contact-data" element={<Suspense><AsyncContactData /></Suspense>} />
        </Routes>
    </div>
}
const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.orders.purchased,
    }
}
export default connect(mapStateToProps)(Checkout);