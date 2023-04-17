const jwt = require("jsonwebtoken");
const admin = require("../controllers/adminControl.js");
const db = require("../models/inici");
const user = db.users;



//_____________________________________________
// _______________  AUTH _______________

// module.exports = async (req, res, next) => {
//   console.log("AUTH req.headers.authorization ------>",req.headers.authorization);
  

//   if (req.headers.authorization == undefined || !req.headers.authorization) {
//     res.status(401).json({
//       error: new Error(),
//       message: "Requete Non authorisée",
//     });
//     return;
//   }
//   const token = req.headers.authorization.split(" ")[1]; // récupère le token dans le header
//   //  console.log("-----token-----", token);
//   const decodedToken = jwt.verify(token, `${process.env.TOKEN}`,function(err, user) {
//     if (err) { 
//     // console.log("ERREUR",err);
//      res.json({message:"ERREUR Response JWT VERIFY ------>",err});
//      return 
//   } else {
//     next();
    
//   }
//   });
//   if(decodedToken){

//   const userIdTok = decodedToken.id; // récupère l'id du token


//   const oneUser = await user
//     .findOne(
//       { id: `${userIdTok}` },
//     )
//     .then((res) => {
   
//       let role = res.role;
      
//       if (role === "admin") {
       
//         return true;
       
//       } else {
       
//       }
//     });

//   try {
    

//     if ((req.body.id && req.body.id === userIdTok) || oneUser == true) {
      

//       next(); // si Id identhique ça continu " la route est protégée"
//     } else if (req.query.id && req.query.id === userIdTok) {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error(),
//       message: "Erreur: Requete non autorisée",
//     });
//   }
// }
// };


// _-----------------

module.exports = (req, res, next) => {
  try {
    console.log("on est là auth");
    console.log("on est là auth",req.query);

    const token = req.headers.authorization.split(" ")[1];
    console.log("TOKEN ------->",token);

    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // NECSSITE UNE REPONSE TOKEN INVALIDE
    console.log("DECODED TOKEN",decodedToken);

    const userId = decodedToken.userId; // récupère l'id du token
    console.log("USER ID----->",userId);
    console.log(" REQ.BODY.UESR ID----->",req.body.userId)
    // compare l'id du token avec l'id utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      console.log(" if req.body.id ",req.body.userId)

      throw "Invalid user ID";
    } else {
      console.log(" else req.body.userId ",req.body.userId)
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};