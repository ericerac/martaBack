const mongoose = require("mongoose");
import Image from ("./image")
import Page from ("./inici")
const ImagePageShema = mongoose.Schema(
  {
    
   
    
page:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Page,
},
image:{
    type: mongoose.Schema.Types.ObjectId,
    ref:Image,
},
   
  },
  
);

module.exports = mongoose.model("imagePage", ImagePageShema);