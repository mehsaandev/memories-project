import React, {useEffect} from 'react'
import { Divider, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import {getPost} from '../../actions/posts'
import {  useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useStyles from './styles'
const PostDetails = () => {
  const classes = useStyles();
  const {id} = useParams();
  const dispatch = useDispatch();
  const {post} = useSelector((state) => state.posts);
  console.log(post)
  useEffect(()=>{
    dispatch(getPost(id))

  },[id])

if(!post) return null
  return (
    // <p>sdf</p>
    <div className={classes.card}>
    <div className={classes.section}>
      <Typography variant="h3" component="h2">{post.title}</Typography>
      <Typography gutterBottom variant="h6" colyor="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
      <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
      <Typography variant="h6">Created by: {post?.name}</Typography>
      <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
      <Divider style={{ margin: '20px 0' }} />
      <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
      <Divider style={{ margin: '20px 0' }} />
    </div>
    <div className={classes.imageSection}>
      <img className={classes.media} src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
    </div>
  </div>
  )
}

export default PostDetails