const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema({
  


  name: { type: String, required: false, default: "navbar", 
     } ,
     
     l_1: { type: String, required: false,default: null },
     l_2: { type: String, required: false,default: null },
     l_3: { type: String, required: false,default: null },
     l_4: { type: String, required: false,default: null },
     l_5: { type: String, required: false,default: null },
     l_5: { type: String, required: false,default: null },
     l_6: { type: String, required: false,default: null },
     l_7: { type: String, required: false,default: null },
     l_8: { type: String, required: false,default: null },
     color_1: { type: String, required: false,default: null },
     phrase: { type: String, required: false,default: null },
     lang: { type: String, required: false,default: "cat" },
     
     imageUrl: { type: String,default: null }, 
    //  imageUrl: { type: String,default: null }, 
     pN:{ type: Boolean, default: true }
},
{
  timestamps:true,
  });

module.exports = mongoose.model("navbar", IniciSchema);