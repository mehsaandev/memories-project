import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import { MongoClient } from "mongodb";

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))
app.use(cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// cloud atlas mongodbs
const CONNECTION_URL =
  "mongodb+srv://mehsaandev:RpoyIXB4ZwXoJ8Hv@cluster0.btui8.mongodb.net/test?retryWrites=true&w=majority";

const PORT = 8080;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch(() => (err) => console.log(err.messsage));

app.get('/',(req,res)=>{
res.send('APP IS RUNNING')
})