import React, {useEffect} from "react";
import axios from "../../axios-ings";
import withErrorHandler from "../../container/Hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/action/index";
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/order/order";

const Ordercomponent = (props) => {
  useEffect(() => {
    props.onStartFetchOrder(props.token, props.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let orders= [];
  for(let key in props.order){
    orders.push({...props.order[key], id: key});
  }
  let order = <Spinner />
  if(!props.loading) {
    order = orders.map(order => <Order 
        key={order.id} 
        ingredients={order.ingredients}
        price={+order.price}
        />)
  }
  return order;
};

const mapStateToProps = state => {
  return {
    order: state.orders.order,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartFetchOrder: (token, userId) => dispatch(actions.startFetchOrder(token, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Ordercomponent, axios));
