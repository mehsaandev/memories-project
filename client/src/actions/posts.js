import * as api from "../api";

//Action Creators

export const getPosts = () => async (dispatch, getState) => {
  try {
    const { data } = await api.fetchPosts();
    console.log(data);
    dispatch({ type: "FETCH_ALL", payload: data });
    console.log(getState());
  } catch (error) {
    console.log(error.message);
  }
};
export const getPost = (id) => async (dispatch, getState) => {
  try {
    const { data } = await api.fetchPost(id);
    console.log(data);
    dispatch({ type: "FETCH_POST", payload: data });
    console.log(getState());
  } catch (error) {
    console.log(error.message);
  }
};
// export const fetchSinglePost = (id) => async (dispatch, getState) => {
//   try {
//     // const { data } = await api.fetchSinglePost(id);
//     // console.log(data);
//     dispatch({ type: "FETCH_ONE", payload: id });
//     console.log(getState());
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const createPost = (post) => async (dispatch, getState) => {
  try {
    console.log(post);
    const { data } = await api.createPost(post);
    console.log("Entered");
    dispatch({ type: "CREATE", payload: data });
    console.log(getState());
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePost = (id, post) => async (dispatch, getState) => {
  try {
    console.log(post);

    const { data } = await api.updatePost(id, post);
    console.log(data);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch, getState) => {
  try {

    await api.deletePost(id);
      dispatch({ type: "DELETE" , payload: id});
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = (id) => async (dispatch, getState) => {
  try {

    const {data} = await api.likePost(id);
      dispatch({ type: "LIKE" , payload: data});
  } catch (error) {
    console.log(error.message);
  }
};
