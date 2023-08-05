import actionType from "../actions/actionType";

const initState = {
  posts: [],
  postsDe: [],
  posts2: [],
  msg: "",
  count: 0,
  newPosts: [],
  postsAd: [],
  dataEdit: {},
};
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_POST_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionType.GET_POST_LIMIT_DE:
      return {
        ...state,
        postsDe: action.postsDe || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionType.GET_POST:
      return {
        ...state,
        posts2: action.posts2 || [],
        msg: action.msg || "",
      };
    case actionType.GET_POST_NEW:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
    case actionType.GET_LIMITADMIN:
      return {
        ...state,
        postsAd: action.postsAd,
        msg: action.msg,
      };
    case actionType.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || {},
      };

    default:
      return state;
  }
};
export default postReducer;
