const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema({
  


  name: { type: String, required: false, default: "bernadette", 
     } ,
     title_1: { type: String, required: false, default: null },
     color_title_1: { type: String, required: false,default: null },
     subTitle_1: { type: String, required: false,default: null },
     color_subTitle_1: { type: String, required: false,default: null },
     synopsis_1: { type: String, required: false,default: null },
     synopsis_2: { type: String, required: false,default: null },
     p_2: { type: String, required: false,default: null },
     p_3: { type: String, required: false,default: null },
     p_4: { type: String, required: false,default: null },
     p_5: { type: String, required: false,default: null },
    //  background:{ type: String,default: null },
     title_2: { type: String, required: false,default: null },
     color_title_2: { type: String, required: false,default: null },
     subTitle_2: { type: String, required: false,default: null },
     color_subTitle_2: { type: String, required: false,default: null },
     phrase: { type: String, required: false,default: null },
     lang: { type: String, required: false,default: "cat" },
     
     imageUrl: { type: String,default: null }, 
    //  imageUrl: { type: String,default: null }, 
     pN:{ type: Boolean, default: true }
},
{
  timestamps:true,
  });

module.exports = mongoose.model("bernadette", IniciSchema);