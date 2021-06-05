//This file creates the order
import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  //sending request and error handling of request

  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      //getstate returns user info using redux store
      userSignin: { userInfo },
    } = getState();
    //data to fetch and options

    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    //fetching the order object
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    //emptying cart after creating order and if it was successfull
    dispatch({ type: CART_EMPTY });
    //Cleaning cart items from local storage
    localStorage.removeItem("cartItems");
    //if payload is an error message then order creation is not succesfull, so i check if payload is an error first
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//action of fetching details of order
export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};
