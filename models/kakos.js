const mongoose = require("mongoose");
// import calPage from("./calendar")
// import homePage from("./inici")
// import espectaclePage from("./galerie")
const { Schema } = mongoose;
const calPage = require("./calendar")


const kakos = mongoose.Schema({
  


     name: { type: String, required: false, default: "kakos", 
     } ,
     title_1: { type: String, required: false, default: null },
     color_title_1: { type: String, required: false,default: null },
     subTitle_1: { type: String, required: false,default: null },
     color_subTitle_1: { type: String, required: false,default: null },
     synopsis_1: { type: String, required: false,default: null },
     synopsis_2: { type: String, required: false,default: null },
     p_1: { type: String, required: false,default: null },
     p_2: { type: String, required: false,default: null },
     p_3: { type: String, required: false,default: null },
     p_4: { type: String, required: false,default: null },
     p_5: { type: String, required: false,default: null },
     p_6: { type: String, required: false,default: null },
     p_7: { type: String, required: false,default: null },
    
     title_2: { type: String, required: false,default: null },
     color_title_2: { type: String, required: false,default: null },
     subTitle_2: { type: String, required: false,default: null },
     color_subTitle_2: { type: String, required: false,default: null },
     phrase: { type: String, required: false,default: null },
     
     lang: { type: String, required: false,default: "cat" },
     
     imageUrl: { type: String,default: null }, 
    //  imageUrl: { type: String,default: null }, 
     
     
  
  
  
});

module.exports = mongoose.model("kakos", kakos);