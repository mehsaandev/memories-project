import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors' 
import postRoutes from './routes/post.js'

const app = express();
app.use('/posts',postRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// cloud atlas mongodb  
const CONNECTION_URL = "mongodb+srv://mehsaandev:mehsaandev1231231213@cluster0.btui8.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on port: ${PORT}`)))
.catch(()=>(err)=>console.log(err.messsage));

