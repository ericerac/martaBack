const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema({
  


  name: { type: String, required: false, default: "elvira", 
     } ,
     title_1: { type: String, required: false, default: null },
     color_title_1: { type: String, required: false,default: null },
     subTitle_1: { type: String, required: false,default: null },
     color_subTitle_1: { type: String, required: false,default: null },
     synopsis_1: { type: String, required: false,default: null },
     synopsis_2: { type: String, required: false,default: null },
     p_0: { type: String, required: false,default: null },
     p_1: { type: String, required: false,default: null },
     p_2: { type: String, required: false,default: null },
     p_3: { type: String, required: false,default: null },
     p_4: { type: String, required: false,default: null },
     p_5: { type: String, required: false,default: null },
     p_6: { type: String, required: false,default: null },
     p_7: { type: String, required: false,default: null },
     p_8: { type: String, required: false,default: null },
     p_9: { type: String, required: false,default: null },
     p_10: { type: String, required: false,default: null },
     p_11: { type: String, required: false,default: null },
     p_12: { type: String, required: false,default: null },
     p_13: { type: String, required: false,default: null },
     p_14: { type: String, required: false,default: null },
     p_15: { type: String, required: false,default: null },
     p_16: { type: String, required: false,default: null },
     p_17: { type: String, required: false,default: null },
     p_18: { type: String, required: false,default: null },
     p_19: { type: String, required: false,default: null },
     p_20: { type: String, required: false,default: null },
     p_21: { type: String, required: false,default: null },
     file: { type: String, required: false,default: null },
    //  background:{ type: String,default: null },
     title_2: { type: String, required: false,default: null },
     color_title_2: { type: String, required: false,default: null },
     subTitle_2: { type: String, required: false,default: null },
     color_subTitle_2: { type: String, required: false,default: null },
     phrase: { type: String, required: false,default: null },
     lang: { type: String, required: false,default: "cat" },
     
     imageUrl: { type: String,default: null }, 
     linkVideo: { type: String,default: null }, 
     pN:{ type: Boolean, default: true }
},
{
  timestamps:true,
  });

module.exports = mongoose.model("elvira", IniciSchema);