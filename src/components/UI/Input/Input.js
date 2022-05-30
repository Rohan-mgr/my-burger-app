import React from "react"; 
import classes from "./Input.css";

const Input = props => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(props.isValid && props.isTouched) {
        inputClasses.push(classes.IsValid);
    }
    switch(props.elementType) {
        case "input": 
            inputElement = <input 
                            className={inputClasses.join(" ")}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}
                            />
            break;      
        case "select": 
            inputElement = <select 
                            className={inputClasses.join("")}
                            value={props.value}
                            onChange={props.changed}>
                                {props.elementConfig.options.map(option => {
                                    return <option 
                                                key={option.value} 
                                                value={option.value}>
                                                {option.displayValue}
                                                </option>
                                })}
                            
                            </select>
            break;
        default: 
            inputElement = <input 
                                className={inputClasses.join("")}
                                {...props.elementConfig}
                                value={props.value}
                                onChange={props.changed}
                                />
            break;

    }
    return <div className={classes.Input}>
        {inputElement}
    </div>;
}
export default Input;