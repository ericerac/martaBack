const express = require("express");
const router = express.Router();
const IniciControl = require("../controllers/inici");
const CalControl = require("../controllers/inici");
const adminControl = require("../controllers/adminControl");
const astro = require("../controllers/astro");
const auth = require("../middleWare/auth");
const resetPassword = require("../controllers/resetPassword");
 const multer = require("../middleWare/multer-config");
// const multer  = require("../middleWare/resize");
const { resetPass } = require("../controllers/resetPassword");

const sharp = require('sharp');


// ROUTE ADMIN ///
router.post("/coconexion", adminControl.login);
router.post("/signup", adminControl.signup);
router.post("/del/admin", auth, adminControl.delAdmin);

 router.post("/create",auth,  multer, IniciControl.createPage);

//   router.post("/create", multer, IniciControl.createPage); // test


// **************************************************************************** //

// ****** resize and stock work but doesn`t reuturn req.file.filename to controller ********+ //

// router.post('/create', multer, async (req, res, next) => {
//     // req.file includes the buffer
//     // path: where to store resized photo
      
//     // console.log("REQ FILE ROUTER", req.file);
//     // const path = `./assets/images/${req.file.originalname}`;

//     // // toFile() method stores the image on disk
//     // await sharp(req.file.buffer).resize(300, 300).toFile(path);
//     // next();
// },IniciControl.createPage);

// **************************************************************************** //

router.post("/cal/create", auth, multer, IniciControl.createPage);

router.put("/del", auth, IniciControl.deletePage);
router.put("/update", auth, multer, IniciControl.modifyPage);
router.put("/fieldPost", IniciControl.updatePostField);

router.post("/forgot-password", resetPassword.forgotPass);
router.get("/reset-password/:id/:token", resetPassword.resetPass);
router.put("/new-password/:id/:token", resetPassword.newPass);

// ROUTE PAGE PATH //
router.get("/", IniciControl.getPage);

router.get("/img", IniciControl.getImg);
router.get("/nav", IniciControl.getNav);
router.get("/ver/AdminAuth", auth, adminControl.getAdminAuth);
router.get("/getAPD",  IniciControl.getAllPageData); // auth, ne pas oublier de remettre
router.get("/getfieldData",  IniciControl.getOnefield); // auth, ne pas oublier de remettre

// router.get("/astro",astro.astroCity)
module.exports = router;
