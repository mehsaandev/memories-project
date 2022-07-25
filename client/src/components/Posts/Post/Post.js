import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { Link } from "react-router-dom";
const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.localId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small">
            &nbsp;
            {post.likes.length > 2
              ? `You and ${post.likes.length - 2} others`
              : `${post.likes.length} like ${post.likes.length > 1 ? "s" : ""}`}
          </ThumbUpAltIcon>
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="large">
            &nbsp; {post.likes.length}
            {post.likes.length > 1 ? "likes" : "like"}
          </ThumbUpAltOutlined>
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small">&nbsp;Like</ThumbUpAltOutlined>
      </>
    );
  };
  const dispatch = useDispatch();

  const classes = useStyles();

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };
  const likePostHandler = (id) => {
    console.log(post);
    dispatch(likePost(id));
  };

  return (
    <Card className={classes.card}>
    <Link to= {`/posts/${post._id}`}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

    </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {user?.result?.localId === post?.creator ||
          user?.result?._id === post?.creator && 
          (

      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
          )
          
          }
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          className={classes.title}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {post.message.length > 200?  String(post.message).substring(0,200) + ' ...':post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => likePostHandler(post._id)}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {user?.result?.localId === post?.creator ||
          user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="primary"
              onClick={() => deletePostHandler(post._id)}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default Post;
