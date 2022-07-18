import * as api from "../api";

//Action Creators

export const getPosts = () => async (dispatch, getState) => {
  try {
    const { data } = await api.fetchPost();
    console.log(data)
    dispatch({ type: "FETCH_ALL", payload: data });
    console.log(getState())
  } catch (error) {
    console.log(error.message)
  }
};

export const createPost = (post) =>async (dispatch) =>{
    try {
      
        const data =  await api.createPost(post)
        console.log("Entered")
       
        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
