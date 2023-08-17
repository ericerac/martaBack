// const multer = require("multer");

// const MIME_TYPES = {
//   "image/jpg": "jpg",
//   "image/jpeg": "jpg",
//   "image/png": "png",
// };

// const storage = multer.diskStorage({

//   destination: (req, file, callback) => {
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(" ").join("_");

//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, name + Date.now() + "." + extension);
//   },
// });

// module.exports = multer({ storage }).single("img_1");

// .single = fichier unique. 'image' = type de fichier

// VERSION P7 -----------

const multer = require("multer");
const express = require("express");
const sharp = require("sharp")
// const sharp = require('sharp');
// const resiz = sharp();
const router = express.Router();

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};




// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//      console.log("MULTER REQ FILE", file);
    
//     callback(null, "./assets/images");
//   },
//   filename: (req, file, callback) => {
//     // console.log("MULTER FILE", file);
//     let name = file.originalname.split(" ").join("_");
//     name = name.split(".")[0];
//     const extension = MIME_TYPES[file.mimetype];
//     console.log("MULTER IMG NAME", name);
//     callback(null, name + Date.now() + "." + extension);
//   },
 
// });
//***** */ necessary to resize file sharp ******// 

 const storage = multer.memoryStorage();

// ********************************************* //
// const resizer =  ((req, file) => {
//   console.log("REQ RESIZER FUNCTION",req);
//   // const path = `./assets/images/${req.file.originalname}`;

//   // // toFile() method stores the image on disk
//   //   sharp(req.file.buffer).resize(300, 300).toFile(path);
  
// })
    

const maxSize = 1 * 1024 * 1024;

module.exports = multer({
  storage: storage,
    
  // resizeImg:(req.filePath, req.filename),
  // imageUpload:imageUpload(),
  fileFilter: (req, file, cb) => {
    console.log("REQ MULTER FILTER",file);
    // console.log("MIMETYPE FILE", file.mimetype);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("format pas accepté"));
    }
  },
  limits: {
    fileSize: maxSize,
  },
  
}).single("image");
