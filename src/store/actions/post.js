import actionType from "./actionType";
import {
  apiLimitPost,
  apiPost,
  apiNewPost,
  apigetPostLimitAdmin,
} from "../../services/post";
export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_POST,
        posts2: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_POST,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST,
      posts2: null,
    });
  }
};
export const getLimitPosts = (query) => async (dispatch) => {
  try {
    const response = await apiLimitPost(query);

    if (response?.data?.err === 0) {
      dispatch({
        type: actionType.GET_POST_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_POST_LIMIT,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST_LIMIT,
      posts: null,
    });
  }
};
export const getLimitPostsDe = (query) => async (dispatch) => {
  try {
    const response = await apiLimitPost({
      id: query.id,
      limitPost: 1,
    });

    if (response?.data?.err === 0) {
      dispatch({
        type: actionType.GET_POST_LIMIT_DE,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_POST_LIMIT_DE,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST_LIMIT_DE,
      posts: null,
    });
  }
};

export const getNewPost = () => async (dispatch) => {
  try {
    const response = await apiNewPost();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_POST_NEW,
        newPosts: response.data.response || [],
      });
    } else {
      dispatch({
        type: actionType.GET_POST_NEW,
        msg: response.data.err,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_POST_NEW,
      newPosts: null,
    });
  }
};
export const getLimitPostAdmin = () => async (dispatch) => {
  try {
    const response = await apigetPostLimitAdmin();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_LIMITADMIN,
        postsAd: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionType.GET_LIMITADMIN,
        postsAd: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_LIMITADMIN,
      postsAd: null,
    });
  }
};
export const EditData = (dataEdit) => ({
  type: actionType.EDIT_DATA,
  dataEdit,
});
// export const delePost = (postId) => ({
//   type: actionType.DELETE_POST,
//   postId,
// });
