import React, {useState, useEffect} from "react";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import { updateObject } from "../shared/utility";
import { checkValidity } from "../shared/utility";
import Button from "../../components/UI/Button/Button";
import {connect} from "react-redux";
import * as actions from "../../store/action/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from "react-router-dom";
import Aux from "../Hoc/Auxiliary";

const Auth = props => {
    const [orderForm, setOrderForm] = useState({
        email: {
            elementType: "input", 
            elementConfig: {
                type:"text", 
                placeholder: "UserName",
            }, 
            value:"", 
            validation: {
                required: true,
            }, 
            valid:false, 
            touched: false,
        },
        password: {
            elementType: "input", 
            elementConfig: {
                type: "text", 
                placeholder: "Password",
            }, 
            value:"", 
            validation: {
                required: true,
                minLength: 8, 
                maxLength: 8,
            }, 
            valid: false, 
            touched: false,
        }
    });
    const [isSignUp, setLoginMethod] = useState(true);
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== "/"){
            props.onSetAuthRedirectPath();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let authForm = [];
    for(let key in orderForm) {
        authForm.push({config: orderForm[key], id: key});
    }
    const inputChangeHandler = (e, inputIdentifier) => {
        const inputedValue = e.target.value;
        const updateElement = updateObject(orderForm[inputIdentifier], {
            value: inputedValue,
            valid: checkValidity(inputedValue, orderForm[inputIdentifier].validation),
            touched: true, 
        })
        const updatedForm = updateObject(orderForm, {
            [inputIdentifier]: updateElement,
        })
        let formValidity = true;
        for(let key in updatedForm) {
            formValidity = formValidity && updatedForm[key].valid
        }
        setOrderForm(updatedForm);
        setFormValid(formValidity);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        props.onAuth(orderForm.email.value, orderForm.password.value, isSignUp);
    }
    const switchSignModeHandler = () => {
        setLoginMethod(prevState => !prevState);
    }
    let authCmp = <Spinner />
    let error = null;
    if(props.error) {
        error = <p>{props.error.message}</p>
    }
    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Navigate to={props.authRedirectPath} />
    }
    if(!props.loading){
        authCmp = <Aux>
            {authRedirect}
            {error}
            <form onSubmit={(e) => submitHandler(e)}>
                {authForm.map(auth => {
                    return <Input 
                        key={auth.id}
                        elementType={auth.config.elementType}
                        elementConfig={auth.config.elementConfig}
                        value={auth.config.value}
                        isValid={!auth.config.valid}
                        isTouched={auth.config.touched}
                        changed={(e) => inputChangeHandler(e, auth.id)}
                    />
                })}
            <Button btnType="Success" toggleBtn={!isFormValid}>Submit</Button>
            </form>
            <Button btnType="Danger" handlerOrderSummary={switchSignModeHandler}>Switch To {isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
        </Aux>
    }
    return <div className={classes.Auth}>
        {authCmp}
    </div>
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading, 
        error: state.auth.error, 
        isAuthenticated: state.auth.token !==  null, 
        buildingBurger: state.burger.building, 
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUP) => {
            dispatch(actions.auth(email, password, isSignUP))
        },
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);