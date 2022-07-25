import React, { Fragment } from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import { useSelector } from "react-redux";
import useStyles from "./styles";
import Post from "./Post/Post";
const Posts = ({setCurrentId}) => {
  // const classes = useStyles();
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts)
  const classes = useStyles();
  console.log("our posts are: " + posts);
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
