import {React, useEffect} from "react"; 
import {Navigate} from "react-router-dom"; 
import * as actions from "../../../store/action/index";
import {connect} from "react-redux";

const Logout = (props) => {
    useEffect(() => {
        props.onLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Navigate to="/" />
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogOut()),
    }
}
export default connect(null, mapDispatchToProps)(Logout);