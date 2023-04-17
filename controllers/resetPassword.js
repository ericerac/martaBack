
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
// const mailSend = require("./mail.js");
const nodemailer = require('nodemailer');

exports.forgotPass = (req, res, next) => {
    console.log("LOGIN BODY FORGOT PASS", req.body);
    // console.log("LOGIN PARAMS",req.query);
  let email = req.body.email;
    Admin.findOne({ email: req.body.email })
  
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ error: " Compte utilisateur non trouvé !" });
        } else {
          console.log("RES USER EXIST", user);
  
          const sec = `${process.env.TOKEN_KEY_RESET}` + user._id;
          console.log("SEC", sec);
          const dataUser = {
            email: user.email,
            id: user._id,
          };
  
          // const token = jwt.sign(dataUser, sec, { expiresIn: "20m" });
          const token = jwt.sign(dataUser, sec, );
          const link = `${process.env.LOCAL_HOST}/reset-password/${user._id}/${token}`;
          console.log("LINK RESET", link);

          const data = {link:link, mail: user.email}
          


        //   var transporter = nodemailer.createTransport({
        //     host: 'ericerac007@gmail.com',
        //     port: 465  ,
        //     //25,
        //     // secure: false,
        //     // service: 'gmail',
        //     auth: {
        //       user: "smtp.elasticemail.com ",
        //       pass: '81E61D33CF27A48304FABA7525507B75220A'
        //     },
        //     tls: {
        //       rejectUnauthorized: false
        //   },
        //   });
        // var mailOptions = {
        // from: 'ericerac007@gmail.com', 
        //   to: `${ user.email}`, 
        //  subject: "reset Password", 
        //   text: `${link}`
        // };
        // transporter.sendMail(mailOptions, function(error, info){
        //   console.log("SENDMAIL",mailOptions);
        //       if (error) {
        //         res
        //     .send(
        //       "ERREUR d'envoil..."
        //     )
        //     .status(401);
        //         console.log("ERREUR",error);
        //       } else {
        //         res
        //     .send(
        //       "Un message de récupération vient de vous être envoyé a votre adresse mail..."
        //     )
        //     .status(200);
        //         console.log('Email sent: ' + info.response);
        //       }
        //     })



          // Function async await // send a mail with the link //
          // send a link to vuejs component with the User_id and token
          // vuejs component whitin " 2 inputs  new password " and a btn to send an update password request mongoose
          res
            .send(
              "Un message de récupération vient de vous être envoyé a votre adresse mail..."
            )
            .status(200);
        }
      })
      .catch((err) => {
        console.log("ERREUR FORGOT", err);
      });
  };
  
  // retrieve data request whith the new password and userId
  
  exports.resetPass = (req, res, next) => {
    const { id, token } = req.params;
    console.log("RESET PASSWORD FUNCTION ID", id);
  
    Admin.findOne({ _id: id }).then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: " Compte utilisateur non trouvé !" });
      } else {
        console.log("USER OK RESET", user);
        //   return res.status(200).json({ message: " Compte utilisateur trouvé RESET!" });
        const sec = `${process.env.TOKEN_KEY_RESET}` + user._id;
        try {
          console.log("SEC RESET BEHIND TRY", sec);
          const payload = jwt.verify(token, sec);
          console.log("TRY PAYLOAD iD", payload.id);
          if (id && id !== payload.id) {
            throw "Invalid user ID";
          } else {
            return res.status(200).json({ userId: `${user._id}`, token: token, page: "newPass" });
            next();
          }
        } catch (error) {
          console.log("ERREUR CATCH", err);
          return res.status(400).json({ message: " Algo falla" });
        }
      }
    });
    // update the password
  };
  exports.newPass = (req, res, next) => {
    const { id, token } = req.params;
    console.log("NEW PASS REQ PARAMS",req.params);
    const password = req.body.password;
    console.log("NEW PASSWORD UPDATE", password);
    const sec = `${process.env.TOKEN_KEY_RESET}` + id;
    try {
      console.log("UPDATE BEHIND TRY", sec);
      const payload = jwt.verify(token, sec);
      console.log("TRY PAYLOAD iD", payload.id);
      if (id && id !== payload.id) {
        throw "Invalid user ID";
      } else {
        console.log("NEW PASSWORD BEFORE BCRYPT");
        bcrypt
          .hash(password, 8) // 8 boucle de hash du password
          .then((hash) => {
            console.log("BEFORE FINDONEUPDATE");
            Admin.findOneAndUpdate(
              { _id: id },
              { $set: { password: hash } },
              { returnNewDocument: true }
            )
              .then(() => {
                console.log("PASSWORD UPDATED");
                res.status(201).json({ message: "password updated" });
              })
              .catch((error) => res.status(400).json({ error }));
          });
      }
    } catch (error) {
      return res.status(401).json({ message: " Temps lien expiré" });
    }
  };