import React,{useState, useEffect} from 'react'
import { Grow,Container,Grid, Paper } from '@material-ui/core'
import useStyles from './styles'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts } from "../../actions/posts";
import { useDispatch } from 'react-redux'
import Pagination from '../Pagination'

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  const currentIdHandler = (id)=>{
    setCurrentId(id);
    console.log("We got current id: :"+currentId )
    
  }
  return (
    <Grow in>
    <Container>
      <Grid
        container
       className={classes.mainContainer}
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={7}>
          <Posts  setCurrentId = {currentIdHandler}/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId = {currentId}  setCurrentId = {setCurrentId}/>
          <Paper
            elevation={6}
          >
          <Pagination/>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home