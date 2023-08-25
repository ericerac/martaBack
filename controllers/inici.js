const fs = require("fs");
const jwt = require("jsonwebtoken");

const Page = require("../models/inici");
const Calendar = require("../models/calendar");
const Galerie = require("../models/galerie");

const pageSelected = require("./js/page");
const Navbar = require("../models/navbar");
const img = require("../models/img");

const bio = require("../models/bio");
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

const db = mongoose.connection;

//-----------------CREATE PAGES vers 1 ----------------------------

exports.createPage = (req, res, next) => {
  console.log("REQ.BODY", req.body);
  // console.log("REQ.PROTOCOLE", `${req.get("host")}`);
  // console.log("PARAMS CREATE PAGE", req.query.page);
  // console.log("PARAMS CREATE BODY", req.body);

  let callPage = pageSelected(req.query.page);

  if (req.file) {
    console.log("REQ FILE CONTROLLER",req.file);
    const page = new callPage({
      ...req.body,

      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }).save(function (err, data) {
      if (err) {
        // console.log("ERREUR", err);
        res.json({
          message: "erreur",
          err,
        });
      } else {
        // console.log("PAGE CRÉE", data);
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
        // console.log("ERREUR NO file", err);
        res.json({
          message: "erreur",
          err,
        });
      } else {
        // console.log("REUSSIE", data);
        res.status(201).json({
          message: "page enregistrée !",
        });
      }
    });
  }
};

//----------------------****** GET PAGE ********----------------------

exports.getPage = (req, res, next) => {
  const limit = 4
  console.log("REQ QUERY NAME GET-PAGE", req.query.name);
  let lang = req.query.lang;
  //  console.log("LANG QUERY", lang);
  let mode = pageSelected(req.query.name);
  const sort = { createdAt: -1}

  console.log("RETURN MODE 1------>", mode);
  mode
    .find({
      name: req.query.name,
      lang: lang,
    })
    .select(['-postGeoloc'])
    // .select(['-postGeoloc']).sort(sort).limit(limit)
    .then((page) => {
      
        
        // res.status(200).json(page.reverse());
        res.status(200).json(page);
    
      // console.log("RESPONSE GET BACK 1----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};
//----------------------****** GET ALL PAGE DATA SPECIFIC FIELD ********----------------------

exports.getAllPageData = (req, res, next) => {
  
  console.log("REQ QUERY NAME GET-PAGE", req.query.name);
  let lang = req.query.lang;
 
  let mode = pageSelected(req.query.name);
  
  console.log("RETURN MODE 1------>", mode);
  mode
    .find({
      name: req.query.name,
      lang: lang,
    })
    .then((page) => {

        res.status(200).json(page.reverse());
    
      // console.log("RESPONSE GET BACK 1----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//----------------------****** GET SPECIFIC FIELD ********----------------------
exports.getOnefield = (req, res, next) => {
  
  console.log("REQ QUERY NAME GET-PAGE", req.query.name);
  let lang = req.query.lang;
  let field = req.query.field
  let mode = pageSelected(req.query.name);
  
  // console.log("RETURN MODE 1------>", mode);
  mode
    .find({
      name: req.query.name,
      lang: lang,
    }).select(field) // select a specific field
    .then((page) => {
        res.status(200).json(page.reverse());
      // console.log("RESPONSE GET BACK 1----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

// exports.getPage = (req, res, next) => {

//   console.log("REQ QUERY NAME GET-PAGE", req.query.name);
//   let lang = req.query.lang;
//   //  console.log("LANG QUERY", lang);
//   let mode = pageSelected(req.query.name);
  
//   console.log("RETURN MODE 1------>", mode);
//   mode
//     .find({
//       name: req.query.name,
//       lang: lang,
//     }).select(['-postGeoloc'])
//     .then((page) => {
      
        
//         res.status(200).json(page);
    
//       // console.log("RESPONSE GET BACK 1----->", page);
//     })
//     .catch((error) =>
//       res.status(404).json({
//         message: "error",
//       })
//     );
// };

//----------------------****** GET IMG ********----------------------

exports.getImg = (req, res, next) => {
  // console.log("REQ QUERY NAME GET-PAGE", req.query.name);
  // console.log("PAGE", req.query);

  img
    .find({
      page: req.query.name,
    })
    .then((page) => {
      res.status(200).json(page);
      // console.log("RESPONSE GET BACK----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//----------------------****** GET NAV ********----------------------
exports.getNav = (req, res, next) => {
  // console.log("REQ QUERY NAME GET-NAV", req.query.name);
  // console.log("REQ QUERY LANG GET-NAV", req.query.lang);
  Navbar.find({
    page: req.query.name,
    lang: req.query.lang,
  })
    .then((page) => {
      res.status(200).json(page);
      // console.log("RESPONSE GET BACK NAV----->", page);
    })
    .catch((error) =>
      res.status(404).json({
        message: "error",
      })
    );
};

//---------------------------MODIFY PAGE-----------------------------------
//---     !!!! reste à gerer une erreur si l'image est introuvable !!!!!!    ------

exports.modifyPage = async (req, res, next) => {
  // console.log("REQ BODY ", req.body);

  // console.log("REQ FILE UPDATE", req.file);
  // console.log("REQ QUERY UPDATE NAME", req.query.name);

  let callPage = pageSelected(req.query.name);

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
  // console.log("PAGE ligne 417", page);
  // console.log("PAGE ligne 418", callPage);

  // --------- find and update ------------

  if (!req.file) {
  } else {
    await callPage
      .findOne({
        _id: req.body.id,
      })
      .exec((err, data) => {
        // console.log("DATA findOne", data);
        if (data.imageUrl) {
          delFileName(data.imageUrl);
        }
        function reportError() {
          if (data == null) {
          } else if (!data.imageUrl) {
          } else {
            // console.log("data.imageUrl To Delete----->", data.imageUrl);
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
      // console.log("DATA.UPDATED 1", resp);

      if (err) {
        res.status(400).json({
          message: err.message,
          err,
        });
      } else {
        // console.log("DATA.UPDATED 2", resp);

        res.status(200).json({
          message: "Mise à jour réussie",
          resp,
        });
      }
    });
};

exports.updatePostField = async (req, res, next) => {
  // console.log("REQ BODY  ", typeof req.body.read);
  // console.log("REQ BODY ", req.body.read);

  // console.log("REQ FILE UPDATE", req.file);
  // console.log("REQ QUERY UPDATE NAME", req.query.name);
  let doc;
  doc = await Post.findById(req.body.id);
  // console.log("POST OPENED ", doc.postOpened);
  // console.log("POST READ ", doc.postRead);
   console.log("POST LOC ", req.body.loc);
let loc = req.body.loc
  if (req.body.opened === "true") {
    console.log("POST OPENED != FALSE");
    var result = await doc.updateOne(
      { 
        $inc: { postOpened: +1 },
        $push: { postGeoloc: loc },
       });
  
  } else {
  }
  if (req.body.read  === "true") {
    console.log("POST READ != FALSE");
    var result = await doc.updateOne(
      { 
        $inc: { postRead: +1 } ,
      }
      );
  
  } else {
  }
  if (result) {
    res.status(200).json({ message: "UPDATE POST OPENED" });
    // res.json({ message: "UPDATE POST OPENED" })
  } else {
    res.status(404).json({ message: "UPDATE OPENED FAILED" });
  }
 
  

  // console.log("RESULT",result)
};

//---------------DELETE----------------------

let delFileName = async (data) => {
  const filename = data.split("/images/")[1];
  // console.log("filename DELETE FUNCTION", filename);
  await fs.unlink(`./assets/images/${filename}`, (err) => {
    if (err) {
      // console.log("DELETE FILE ERROR",err);
      throw err;
    } else {
      // console.log(`Fichier : ${filename} éffaçé`);
      return true;
    }
  });
};


exports.deletePage = (req, res, next) => {
  // console.log("DELETE PAGE ID", req.body.id);
  // console.log("REQ QUERY NAME DEL CARD", req.query.name);

  let callPage = pageSelected(req.query.name);
  if (callPage == "cal") {
    callPage = "calendar";
  }

  callPage
    .findOne({
      _id: req.body.id,
    })
    .exec((err, data) => {
      // console.log("DATA findOne", data);

      function reportError() {
        if (data == null) {
        } else if (!data.imageUrl) {
        } else {
          // console.log("data.imageUrl To Delete----->", data.imageUrl);
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
      // console.log("DATA.DELETE 1", resp);

      if (err) {
        res.status(400).json({
          message: err.message,
          err,
        });
      } else {
        // console.log("DATA.DELETE 2", resp);

        res.status(200).json({
          message: "Card effacé",
          resp,
        });
      }
    });
};

//---------------------------------------------------------
