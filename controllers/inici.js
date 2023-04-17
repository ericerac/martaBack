const fs = require("fs");

const jwt = require("jsonwebtoken");
const Page = require("../models/inici");
const Calendar = require("../models/calendar");
const Galerie = require("../models/galerie");
// const Admin = require("../models/admin");
const pageSelected = require("./js/page")


 const bio = require("../models/bio"); 
 const Navbar = require("../models/navbar");
const img = require("../models/img");
const Bernadette = require("../models/bernadette");
const Image = require("../models/image");
const kakos = require("../models/kakos");
const Emperdonadas = require("../models/emperdonadas");
const Elvira = require("../models/elvira");
const Post = require("../models/post_blog");
const Blog = require("../models/blog");
const Creation = require("../models/creation");

const mongoose = require("mongoose");
const dbConfig = require("../config/dbConfig");
// const filter = require("./ReqFilter");

const db = mongoose.connection;

//-----------------CREATE PAGES vers 1 ----------------------------

exports.createPage = (req, res, next) => {
  // console.log("REQ.BODY", req);
  console.log("REQ.PROTOCOLE", `${req.get("host")}`);
  console.log("PARAMS CREATE PAGE", req.query.page);
  console.log("PARAMS CREATE BODY", req.body);

  
  let callPage = pageSelected (req.query.page)
  
  if (req.file) {
    
    const page = new callPage({
      ...req.body,

      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }).save(function (err, data) {
      if (err) {
        console.log("ERREUR", err);
        res.json({
          message: "erreur",
          err,
        });
      } else {
        console.log("PAGE CRÉE", data);
        res.status(201).json({
          message: "page  enregistrée !",
          data,
        });
      }
    });
  } else {
    const page = callPage({
      ...req.body,
    }).save(function (err, data) {
      if (err) {
        console.log("ERREUR NO file", err);
        res.json({
          message: "erreur",
          err,
        });
      } else {
        console.log("REUSSIE", data);
        res.status(201).json({
          message: "page enregistrée !",
        });
      }
    });
  }
};


//----------------------****** GET PAGE ********----------------------

exports.getPage = (req, res, next) => {
  console.log("REQ QUERY NAME GET-PAGE", req.query.name);

  let lang = req.query.lang;
  

 console.log("LANG QUERY", lang);

   let mode = pageSelected (req.query.name)
   
  
  console.log("RETURN MODE",mode);
  
  console.log("LANG AND MODE",lang,mode);
  
  mode
    .find(
      {
        name: req.query.name,
        // page: pag,
        lang: lang,
      }

      // name: img,
    )
    // .populate("image")
    .then((page) => {
      res.status(200).json(page);
      console.log("RESPONSE GET BACK 1----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//----------------------****** GET IMG ********----------------------

exports.getImg = (req, res, next) => {
  console.log("REQ QUERY NAME GET-PAGE", req.query.name);
  console.log("PAGE", req.query);

  img
    .find({
      page: req.query.name,
      
    })
    .then((page) => {
      res.status(200).json(page);
      console.log("RESPONSE GET BACK----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//----------------------****** GET NAV ********----------------------
exports.getNav = (req, res, next) => {
  console.log("REQ QUERY NAME GET-NAV", req.query.name);
  console.log("REQ QUERY LANG GET-NAV", req.query.lang);
  Navbar.find({
    page: req.query.name,
    lang: req.query.lang,
  })
    .then((page) => {
      res.status(200).json(page);
      console.log("RESPONSE GET BACK NAV----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//----------------------****** GET ALL PAGES ********----------------------


//--------------

//---------------------------MODIFY PAGE-----------------------------------
//---     !!!! reste à gerer une erreur si l'image est introuvable !!!!!!    ------

exports.modifyPage = async (req, res, next) => {
  console.log("REQ BODY ", req.body);

  console.log("REQ FILE UPDATE", req.file);
  console.log("REQ QUERY UPDATE NAME", req.query.name);

  let callPage = pageSelected (req.query.name)

  const page = req.file
    ? {
        ...req.body,

        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };
  console.log("PAGE ligne 417", page);
  console.log("PAGE ligne 418", callPage);

  // --------- find and update ------------

  if (!req.file) {
  } else {
    await callPage
      .findOne({
        _id: req.body.id,
      })
      .exec((err, data) => {
        console.log("DATA findOne", data);
        if (data.imageUrl) {
          delFileName(data.imageUrl)
        }
        function reportError() {
          if (data == null) {
          } else if (!data.imageUrl) {
          } else {
            console.log("data.imageUrl To Delete----->", data.imageUrl);

            // efface l'ancienne image
          }
        }
        reportError();
      });
  }

  // sauve garde. don't work with id null or undefined

  await callPage
    .findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        $set: {
          ...page,
        },
      },
      {
        new: true,
      }
    )
    .exec((err, resp) => {
      console.log("DATA.UPDATED 1", resp);

      if (err) {
        res.status(400).json({
          message: err.message,
          err,
        });
      } else {
        console.log("DATA.UPDATED 2", resp);

        res.status(200).json({
          message: "Mise à jour réussie",
          resp,
        });
      }
    });
};

let delFileName = async (data) => {
  const filename = data.split("/images/")[1];
  console.log("filename DELETE FUNCTION", filename);
  await fs.unlink(`./assets/images/${filename}`, (err) => {
    if (err) {
      console.log("DELETE FILE ERROR",err);
      throw err;
    } else {
      console.log(`Fichier : ${filename} éffaçé`);
      return true
    }
  });
};

//---------------DELETE----------------------

exports.deletePage = (req, res, next) => {
  console.log("DELETE PAGE ID", req.body.id);
  console.log("REQ QUERY NAME DEL CARD", req.query.name);

  
  let callPage = pageSelected (req.query.name)
  
  callPage
    .findOne({
      _id: req.body.id,
    })
    .exec((err, data) => {
      console.log("DATA findOne", data);

      function reportError() {
        if (data == null) {
        } else if (!data.imageUrl) {
        } else {
          console.log("data.imageUrl To Delete----->", data.imageUrl);
          delFileName(data.imageUrl); // efface l'ancienne image
        }
      }
      reportError();
    });

  callPage
    .deleteOne({
      _id: req.body.id,
    })
    .exec((err, resp) => {
      console.log("DATA.DELETE 1", resp);

      if (err) {
        res.status(400).json({
          message: err.message,
          err,
        });
      } else {
        console.log("DATA.DELETE 2", resp);

        res.status(200).json({
          message: "Card effacé",
          resp,
        });
      }
    });
};

// exports.deletePage = (req, res, next) => {
//   console.log("DELETE PAGE ID", req.body.id);
//   console.log("REQ QUERY NAME DEL CARD", req.query.name);

//   let callPage = "";

//   switch (req.query.name) {
//     case "calCard":
//       callPage = Calendar;
//       break;

//     case "portada":
//       callPage = Page;
//       break;
//     case "blog":
//       callPage = Post;
//       break;

//     case "gal":
//       callPage = Galerie;
//       break;
//       case "elvira":
//         callPage = Elvira;
//         break;
//       case "emperdonadas":
//       callPage = Emperdonadas;
//       break;
//   }
//   callPage
//     .findOne({
//       _id: req.body.id,
//     })
//     .then((res) => {
//       console.log("RES FIND ONE", res);
//       let filename = "";

//       if (res.imageUrl) {
//         filename = res.imageUrl.split("/images/")[1];
//         console.log("DELETE PAGE filename to delete ------>", filename);
//         console.log(" DELETE PAGE res.imageUrl ------>", res.imageUrl);

//         fs.unlink(`./images/${filename}`, () => {
//           callPage
//             .deleteOne({
//               _id: req.body.id,
//             })
//             .then((res) => {
//               console.log(".DELETE PAGE AVEC IMG------>", res.deletedCount);

//               // res.status(200).json({
//               //   message: "La Page a été supprimée !",
//               //   res
//               // });
//             })
//             .catch((err) => {});
//         });
//       } else {
//         callPage
//           .deleteOne({
//             _id: req.body.id,
//           })
//           .then((res) => {
//             console.log(".DELETE PAGE SANS IMG------->", res);
//           })
//           .catch(error);
//       }
//     })
//     .then((res) => {
//       res.status(200).json({
//         message: "La Page a été supprimée !",
//         res,
//       });
//     })
//     .catch((error) =>
//       res.status(400).json({
//         message: "error",
//         error,
//       })
//     );
// };

//---------------------------------------------------------
