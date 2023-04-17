const nodemailer = require('nodemailer');
// console.log("DATA",data);
 var transporter = nodemailer.createTransport({
     host: 'eric2022contact@gmail.com',
     port: 2525  ,
     //25,
    // secure: false,
     //service: 'gmail',
     auth: {
       user: "smtp.elasticemail.com ",
       pass: '81E61D33CF27A48304FABA7525507B75220A'
     },
     tls: {
       rejectUnauthorized: false
   },
   });
 var mailOptions = {
 from: 'votre-email.d@exemple.com', 
   to: 'exemple@gmail.com', 
  subject: "le sujet de votre email", 
   text: "le contenu de votre email"
 };
 transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     })