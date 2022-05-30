import React from "react"; 
import classes from "./BuildControl.css";

const BuildControl = props => {
    return <div className={classes.BuildControl}>
        
        <div className={classes.label}>{props.label}</div>
        <button className={classes.More} onClick={props.clickedMore}>More</button>
        <button 
        className={classes.Less} 
        onClick={props.clickedLess}
        disabled={props.disableLessBtn} 
        >Less</button>
    </div>
}
export default BuildControl;