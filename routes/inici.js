const express = require("express");
const router = express.Router();
const IniciControl = require("../controllers/inici");
const CalControl = require("../controllers/inici");
const adminControl = require("../controllers/adminControl");
const astro = require("../controllers/astro");
const auth = require("../middleWare/auth");
const resetPassword = require("../controllers/resetPassword");
const multer = require("../middleWare/multer-config");
const { resetPass } = require("../controllers/resetPassword");

// ROUTE ADMIN ///
router.post("/coconexion", adminControl.login);
router.post("/signup", adminControl.signup);
router.post("/del/admin", auth, adminControl.delAdmin);

router.post("/create",  multer, IniciControl.createPage);
// auth, ne pas oublier de remettre

router.post("/cal/create", auth, multer, IniciControl.createPage);

router.put("/del", auth, IniciControl.deletePage);
router.put("/update", auth, multer, IniciControl.modifyPage);

router.post("/forgot-password", resetPassword.forgotPass);
router.get("/reset-password/:id/:token", resetPassword.resetPass);
router.put("/new-password/:id/:token", resetPassword.newPass);

// ROUTE PAGE PATH //
router.get("/", IniciControl.getPage);

router.get("/img", IniciControl.getImg);
router.get("/nav", IniciControl.getNav);
router.get("/ver/AdminAuth", auth, adminControl.getAdminAuth);

// router.get("/astro",astro.astroCity)
module.exports = router;
