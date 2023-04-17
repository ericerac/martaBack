
`use strict`

const express = require("express");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const multer = require("multer");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const cors = require("cors");

 const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

app.use(mongoSanitize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const iniciRoutes = require("./routes/inici");

//const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())







// mongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.quq8c.mongodb.net/${process.env.DB_NAME_TAB}?retryWrites=true&w=majority`, async function (error, client) {
//     if (error) {
//         console.error(error)
//         return
//     }
 
//     const db = client.db("multiple_images_upload")
//     console.log("Database connected",db)
 
//     // [routes]
// })


mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.quq8c.mongodb.net/${process.env.DB_NAME_TAB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("Connexion DB réussie !")
    
  })

  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

  

// cors
app.use((req, res, next) => {
  // console.log("RES CORS",res);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


//  app.use("images", express.static("./images"));
  app.use(express.static("assets"));
 app.use(express.static("images"));



app.use("/inici", iniciRoutes);

// app.post("./create",(req,res)=>{
//   console.log("APP CREATE REQ",req);
// Upload(req,res, function(err){
//   if ( err instanceof multer.MulterError){
//     res.send(err)
//   }else if(err){
//     res.send(err)
//   }
//   console.log("APP REQ:FILE",req.file);
// })
// })

module.exports = app;