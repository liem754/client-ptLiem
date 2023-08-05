import actionType from "../actions/actionType";

const initState = {
  userData: {},
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_CURRENT:
      return {
        ...state,
        userData: action.userData || {},
        msg: action.msg || "",
      };
    case actionType.LOGOUT:
      return {
        ...state,
        userData: {},
      };
    default:
      return state;
  }
};
export default userReducer;
