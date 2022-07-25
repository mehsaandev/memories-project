import * as api from "../api";

//Action Creators

export const signIn = (profileData, history) => async (dispatch) => {
  try {
    // Sign in the user

    const { data } = await api.signIn(profileData);
    dispatch({ type: "AUTH", data });
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = (profileData, history) => async (dispatch) => {
  try {
    // Sign Up the user

    const { data } = await api.signUp(profileData);
   
    console.log(data)
    dispatch({ type: "AUTH",data});
    history.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
