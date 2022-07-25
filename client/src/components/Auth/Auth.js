import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../firebase/firebase";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import GoogleButton from "react-google-button";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useHistory } from "react-router-dom";

import {signUp, signIn} from '../../actions/auth'


const initialState = {
  firstName : "",
  lastName : "",
  email: "",
  password: "",
  confirmPassword: ""
}
const Auth = () => {

    const [profileData, setProfileData] = useState(initialState)


  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // const isSignUp = true;
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const result = res?._tokenResponse;
        const tokenId = result.idToken;
        try {
          dispatch({type: 'AUTH', data: {result,tokenId}})

          history.push('/')
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    if(isSignUp){
      console.log("Sign Up")
      dispatch(signUp(profileData,history))
    }
    else {
      dispatch(signIn(profileData,history))

    }
    console.log(profileData)


  };

  const handleChange = (e) => {
    console.log("hgjhg")
    setProfileData({...profileData,[e.target.name] : e.target.value})
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <GoogleButton onClick={signInWithGoogle}>
                Sign In With Google
              </GoogleButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
