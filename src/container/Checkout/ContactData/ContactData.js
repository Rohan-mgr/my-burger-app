import React, {useState} from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import {connect} from "react-redux";
import { checkValidity, updateObject } from "../../shared/utility";
import withErrorHandler from "../../Hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-ings";
import * as actions from "../../../store/action/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input", 
            elementConfig: {
                type:"text", 
                placeholder: "Full Name",
            }, 
            value:"", 
            validation: {
                required: true,
            }, 
            valid:false, 
            touched: false,
        }, 
        street: {
            elementType: "input", 
            elementConfig: {
                type:"text", 
                placeholder: "Street",
            }, 
            value:"", 
            validation: {
                required: true,
            }, 
            valid:false, 
            touched: false,
        },
        zipCode: {
            elementType: "input", 
            elementConfig: {
                type:"text", 
                placeholder: "Zip Code",
            }, 
            value:"", 
            validation: {
                required: true,
                minLength: 5, 
                maxLength: 5,
            }, 
            valid:false, 
            touched: false,
        },
        country: {
            elementType: "input", 
            elementConfig: {
                type:"text", 
                placeholder: "Country",
            }, 
            value:"", 
            validation: {
                required: true,
            }, 
            valid:false, 
            touched: false,
        },
        email: {
            elementType: "input", 
            elementConfig: {
                type:"email", 
                placeholder: "E-mail",
            }, 
            value:"", 
            validation: {
                required: true,
            }, 
            valid:false, 
            touched: false,
        },
        delivery: {
            elementType: "select", 
            elementConfig: {
                options: [
                    {value:"fastest", displayValue:"Fastest"}, 
                    {value:"cheaper", displayValue: "Cheaper"},
                ],
            }, 
            value:"fastest", 
            validation: {
                required: true,
            }, 
            valid:true,
        },
    });
    const [isFormValid, setFormValidation] = useState(false);

    const inputChangeHandler = (e, inputIdentifier) => {
        const inputedValue = e.target.value;
        const updateElement = updateObject(orderForm[inputIdentifier], {
            value: inputedValue,
            valid: checkValidity(inputedValue, orderForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedForm = updateObject(orderForm, {
            [inputIdentifier]: updateElement,
        });
        let formValidity = true;
        for(let key in updatedForm){
            formValidity = updatedForm[key].valid && formValidity;
        }
        setOrderForm(updatedForm);
        setFormValidation(formValidity);
    }
    let formElementArray = [];
    for(let key in orderForm) {
        formElementArray.push({
            id: key, 
            config: orderForm[key],
        })
    }
    const orderPostHandler = (e) => {
        e.preventDefault();
        let formData = {};
        // console.log(formElementArray);
        for (let key in orderForm) {
            formData[key] = orderForm[key].value;
        }
        
        let order = {
            ingredients: props.ings, 
            price: props.price.toFixed(2), 
            orderData: formData,
            userId: props.userId,
        }
        props.onInitBurgerPurchase(order, props.token);
    }

    let form = (
        <form onSubmit={(e) => orderPostHandler(e)}>
            {formElementArray.map((formElement) => {
                return <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    isValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    isTouched={formElement.config.touched}
                    changed={(e) => inputChangeHandler(e, formElement.id)}
                />
            })}
        <Button btnType="Success" toggleBtn={!isFormValid}>Order</Button>
        </form>
    );
    if(props.loading) {
        form = <Spinner />
    }
    return <div className={classes.ContactData}>
        <h4>Fill Up your Contact Details </h4>
        {form}
    </div>
}
const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onInitBurgerPurchase: (orderData, token) => dispatch(actions.initBurgerPurchase(orderData, token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)); 