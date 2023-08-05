import actionType from "./actionType";
import { apiCategories } from "../../services/category";
import { apiPrice } from "../../services";
import { apiArea } from "../../services/area";
import { apiProvince } from "../../services/province";
import { apigetCurrent } from "../../services/user";
export const getCategory = () => async (dispatch) => {
  try {
    const response = await apiCategories();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_CATEGORY,
        categories: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_CATEGORY,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CATEGORY,
      posts: null,
    });
  }
};
export const getPrice = () => async (dispatch) => {
  try {
    const response = await apiPrice();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PRICES,
        prices: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: "",
      });
    } else {
      dispatch({
        type: actionType.GET_PRICES,
        prices: null,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PRICES,
      prices: null,
    });
  }
};
export const getArea = () => async (dispatch) => {
  try {
    const response = await apiArea();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_AREAS,
        areas: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: "ok!",
      });
    } else {
      dispatch({
        type: actionType.GET_AREAS,
        areas: null,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_AREAS,
      areas: null,
    });
  }
};
export const getProvince = () => async (dispatch) => {
  try {
    const response = await apiProvince();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_PROVINCES,
        provinces: response.data.response,
        msg: "ok!",
      });
    } else {
      dispatch({
        type: actionType.GET_PROVINCES,
        provinces: null,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PROVINCES,
      provinces: null,
    });
  }
};
export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apigetCurrent();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_CURRENT,
        userData: response.data.response,
        msg: "OK!",
      });
    } else {
      dispatch({
        type: actionType.GET_CURRENT,
        userData: null,
        msg: response.data.err,
      });
      dispatch({ type: actionType.LOGOUT });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_CURRENT,
      userData: null,
    });
    dispatch({ type: actionType.LOGOUT });
  }
};
