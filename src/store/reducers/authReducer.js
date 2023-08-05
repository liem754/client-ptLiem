import actionType from "../actions/actionType";

const initState = {
  isLoggedIn: false,
  token: null,
  msg: "",
  update: false,
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
    case actionType.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        msg: "",
      };
    case actionType.LOGIN_FAIL:
    case actionType.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: action.data,
        update: !state.update,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        msg: "",
      };
    default:
      return state;
  }
};
export default authReducer;
