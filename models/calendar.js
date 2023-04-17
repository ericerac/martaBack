const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema({
  


     name:{ type: String, required: false, default: `calendar` },
     show_name:{ type: String, required: false,default: null },
     info_top: { type: String, required: false,default: null },
     day: { type: String, required: false,default: null },
     // month: { type: String, required: false,default: null },
     // // year: { type: String, required: false,default: null },
     hour: { type: String, required: false, default: "por definir" },
     event: { type: String, required: false,default: null },
     detail: { type: String, required: false,default: null },
     imageUrl: { type: String, required: false,default: null },
     link_event: { type: String, default: null },
     link_show: { type: String, default: null },
     pN:{ type: Boolean, default: true },
     lang: { type: String, required: false,default: "free" },
  
  
},
{
timestamps:true,
});

module.exports = mongoose.model("calendar", IniciSchema);