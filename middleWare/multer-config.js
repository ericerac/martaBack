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

// const ResImg = resiz(req.file.buffer).resize(250,250).toFile();
// console.log("FILE RESIZED", ResImg);

// const sharp = require('sharp');

// const imageUpload = async (req) => {

//     // const formattedFileName = req.file.originalname.split(' ').join('-'); //replace space with -
//     try {
//         await sharp(req.file.buffer)
//         .resize({with:300, height:300}) //max width = 800 or height = 600
//         .toFile('./uploads/'+ formattedFileName); //upload to /upload folder

//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = imageUpload;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log("MULTER REQ FILE", file);
    
    callback(null, "./assets/images");
  },
  filename: (req, file, callback) => {
    // console.log("MULTER FILE", file);
    let name = file.originalname.split(" ").join("_");
    name = name.split(".")[0];
    const extension = MIME_TYPES[file.mimetype];
    console.log("MULTER IMG NAME", name);
    callback(null, name + Date.now() + "." + extension);
  },
});

const maxSize = 1 * 1024 * 1024;

module.exports = multer({
  storage: storage,
  // imageUpload:imageUpload(),
  fileFilter: (req, file, cb) => {
    //  console.log("REQ MULTER FILTER",req);
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
