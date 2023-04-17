const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema(
  {
    name: { type: String, required: false, default: "img" },
    showName: { type: String, required: false,  },
    img: { type: Number, required: true },
    page: { type: String, required: false, default: null },
    imageUrl: { type: String, default: null },
    link: { type: String, default: null },

    pN: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("img", IniciSchema);
