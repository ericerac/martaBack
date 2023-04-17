const { timeStamp } = require("console");
const mongoose = require("mongoose");

const GalSchema = mongoose.Schema({
  


     
     name:{ type: String, required: true,default: "galerie" },
     product:{ type: String, required: true,default: "galerie" },
     cathegorie:{ type: String, required: true,default: "galerie" },
     prix:{ type: Number, required: true,default: null },
     info_top:{ type: String, required: true,default: null },    
     credit: { type: String, required: false,default: null },
     description: { type: String, required: false,default: null },
     imageUrl: { type: String, required: false,default: null },
     link_img: { type: String, default: null },
     // pN:{ type: Boolean, default: true },
  
},
{
     timestamps:true,
     });

module.exports = mongoose.model("galerie", GalSchema);