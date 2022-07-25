import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import {Link , useLocation} from 'react-router-dom'
import memories from "../../images/memories.png";
import useStyles from "./styles";
import  decode from "jwt-decode";
import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    // const user = null
    console.log(user);
  const classes = useStyles();
  const logout = () =>{
    dispatch({type: 'LOGOUT' , })
    setUser(null);
  }

  useEffect(()=>{
      const token = user?.token
      if(token){
        new Date();
        const decodedToken = decode(token);
        if((decodedToken.exp * 1000) < new Date().getTime()) logout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className = {classes.toolbar}>
      {user? (
        <div className={classes.profile}>
        <Avatar className={classes.purple} alt= {user?.result?.fullName} src={user?.result?.photoUrl}>{user?.result?.fullName.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant="h6">{user?.result?.fullName}</Typography>
        <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
        </div>  
      ) : (
        <Button component={Link} to='/auth' variant="contained" color='primary'>Sign In</Button>
      )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
