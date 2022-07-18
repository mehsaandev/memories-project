import React, { Fragment } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";
import useStyles from "./styles";
import Post from "./Post/Post";
const Posts = () => {
  // const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  console.log("our posts are: "+posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {/* {posts.map()} */}
    </Grid>
  );
};

export default Posts;
