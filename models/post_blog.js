const mongoose = require("mongoose");

const IniciSchema = mongoose.Schema(
  {
    name: { type: String, required: false, default: "post" },
    title_1: { type: String, required: false, default: null },
    color_title_1: { type: String, required: false, default: null },
    subTitle_1: { type: String, required: false, default: null },
    color_subTitle_1: { type: String, required: false, default: null },
    p_1: { type: String, required: false, default: null },
    title_2: { type: String, required: false, default: null },
    p_2: { type: String, required: false, default: null },
    title_3: { type: String, required: false, default: null },
    p_3: { type: String, required: false, default: null },
    title_4: { type: String, required: false, default: null },
    p_4: { type: String, required: false, default: null },
    title_5: { type: String, required: false, default: null },
    p_5: { type: String, required: false, default: null },
    theme: { type: String, required: false, default: "actu" },

    Text_link1: { type: String, required: false, default: null },
    link_1: { type: String, required: false, default: null },
    Text_link2: { type: String, required: false, default: null },
    link_2: { type: String, required: false, default: null },
    Text_link3: { type: String, required: false, default: null },
    link_3: { type: String, required: false, default: null },
    Text_link4: { type: String, required: false, default: null },
    link_4: { type: String, required: false, default: null },
    Text_link5: { type: String, required: false, default: null },
    link_5: { type: String, required: false, default: null },
    blog_name: { type: String, required: true },

    postOpened: { type: Number, default: 0 },
    postRead: { type: Number, default: 0 },

    postGeoloc: [{ type: String }],

    lang: { type: String, required: false, default: "cat" },

    imageUrl: { type: String, default: null },
    description_image: { type: String, default: null },
    
    pN: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", IniciSchema);
