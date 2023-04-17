const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

let user = "";
// ------ VERIF AUTH ADMINPAGE RELOAD ------//
exports.getAdminAuth = (req, res, next) => {
  console.log("REQUET ADMIN AUTH BACK",req.query);
  res.status(200).json({
    message: "OK",
  });
};

exports.signup = (req, res, next) => {
  console.log(req.body, "signup");
  Admin.findOne({ email: req.body.email })
    .then((email) => {
      bcrypt
        .hash(req.body.password, 8) // 8 boucle de hash du password
        .then((hash) => {
          const admin = new Admin({
            // schema des données
            name: req.body.name,
            email: req.body.email,
            password: hash,
          });
          admin
            .save()
            .then(() =>
              res.status(201).json({ message: "Compte utilisateur crée" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      //}
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  console.log("LOGIN BODY", req.body);
  // console.log("LOGIN PARAMS", req.query);

  Admin.findOne({ email: req.body.email })

    .then((user) => {
      if (!user) {
        console.log("email inconnu ");

        return res
          .status(401)
          .json({ error: " Compte utilisateur non trouvé !" });
      }

      bcrypt
        .compare(req.body.password, user.password) // return boolean
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "12h",
              //  role: "admin",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.delAdmin = (req, res, next) => {
  console.log(req.body, "DELADMIN");
  Admin.findOne({ email: req.body.email, name: req.body.name })
    .then((res) => {
      console.log("RES EFFACÉ", res);
    })
    .catch((err) => {
      console.log("ERREUR", err);
    });
};



// exports.forgotPass = (req, res, next) => {
//   console.log("LOGIN BODY", req.body);
//   // console.log("LOGIN PARAMS",req.query);

//   Admin.findOne({ email: req.body.email })

//     .then((user) => {
//       if (!user) {
//         return res
//           .status(401)
//           .json({ error: " Compte utilisateur non trouvé !" });
//       } else {
//         console.log("RES USER EXIST", user);

//         const sec = `${process.env.TOKEN_KEY_RESET}` + user._id;
//         console.log("SEC", sec);
//         const dataUser = {
//           email: user.email,
//           id: user._id,
//         };

//         const token = jwt.sign(dataUser, sec, { expiresIn: "20m" });
//         const link = `${process.env.LOCAL_HOST}/reset-password/${user._id}/${token}`;
//         console.log("LINK RESET", link);
//         // send a link to vuejs component with the User_id and token
//         // vuejs component whitin " 2 inputs  new password " and a btn to send an update password request mongoose
//         res
//           .send(
//             "Un message de récupération vient de vous être envoyé a votre adresse mail..."
//           )
//           .status(200);
//       }
//     })
//     .catch((err) => {
//       console.log("ERREUR FORGOT", err);
//     });
// };





// // retrieve data request whith the new password and userId

// exports.resetPass = (req, res, next) => {
//   const { id, token } = req.params;
//   console.log("RESET PASSWORD FUNCTION ID", id);

//   Admin.findOne({ _id: id }).then((user) => {
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: " Compte utilisateur non trouvé !" });
//     } else {
//       console.log("USER OK RESET", user);
//       //   return res.status(200).json({ message: " Compte utilisateur trouvé RESET!" });
//       const sec = `${process.env.TOKEN_KEY_RESET}` + user._id;
//       try {
//         console.log("SEC RESET BEHIND TRY", sec);
//         const payload = jwt.verify(token, sec);
//         console.log("TRY PAYLOAD iD", payload.id);
//         if (id && id !== payload.id) {
//           throw "Invalid user ID";
//         } else {
//           return res.status(200).json({ userId: `${user._id}`, token: token });
//           next();
//         }
//       } catch (error) {
//         return res.status(400).json({ message: " Algo falla" });
//         console.log("ERREUR CATCH", err);
//       }
//     }
//   });
//   // update the password
// };



// exports.newPass = (req, res, next) => {
//   const { id, token } = req.params;
//   const password = req.body.password;
//   console.log("NEW PASSWORD UPDATE", password);
//   const sec = `${process.env.TOKEN_KEY_RESET}` + id;
//   try {
//     console.log("UPDATE BEHIND TRY", sec);
//     const payload = jwt.verify(token, sec);
//     console.log("TRY PAYLOAD iD", payload.id);
//     if (id && id !== payload.id) {
//       throw "Invalid user ID";
//     } else {
//       console.log("NEW PASSWORD BEFORE BCRYPT");
//       bcrypt
//         .hash(password, 8) // 8 boucle de hash du password
//         .then((hash) => {
//           console.log("BEFORE FINDONEUPDATE");
//           Admin.findOneAndUpdate(
//             { _id: id },
//             { $set: { password: hash } },
//             { returnNewDocument: true }
//           )
//             .then(() => {
//               console.log("PASSWORD UPDATED");
//               res.status(201).json({ message: "password updated" });
//             })
//             .catch((error) => res.status(400).json({ error }));
//         });
//     }
//   } catch (error) {
//     return res.status(401).json({ message: " Temps lien expiré" });
//   }
// };
