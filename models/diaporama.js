const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    
   
    page: { type: String, required: false, default: "diapo" },
    imageUrl: { type: String, default: null },
    img: { type: Number, default: null },
    link: { type: String, default: null },
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"bernadette",
},
    pN: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", ImageSchema);