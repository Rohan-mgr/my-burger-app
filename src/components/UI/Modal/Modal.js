import React from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../container/Hoc/Auxiliary";

const Modal = (props) => {
  return (
    <Aux>
      <div
        className={classes.Modal}
        style={{
          transform: props.showBackdrop ? "translateY(0)" : "translateY(-100%)",
          opacity: props.showBackdrop ? "1" : "0",
        }}
      >
        {props.children}
      </div>
      <Backdrop
        show={props.showBackdrop}
        closeBackdrop={props.BackdropHandler}
      />
    </Aux>
  );
};
export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
  );
});
