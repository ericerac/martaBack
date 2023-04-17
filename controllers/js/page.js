const Page = require("../../models/inici");
const Calendar = require("../../models/calendar");
const bio = require("../../models/bio");
const img = require("../../models/img");
const Bernadette = require("../../models/bernadette");
const kakos = require("../../models/kakos");
const Emperdonadas = require("../../models/emperdonadas");
const Elvira = require("../../models/elvira");
const Post = require("../../models/post_blog");
const Creation = require("../../models/creation");
const Blog = require("../../models/blog");
// let Creation = "";
// let Emperdonadas ="";
// let Elvira ="";

module.exports = function pageSelected(name) {
 

  switch (name) {
    case "portada":
      return Page;

    case "bernadette":
      return Bernadette;

    case (name = "bio"):
      return bio;

    case (name = "calendar"):
      return Calendar;

    case (name = "post"):
      return Post;

    case (name = "blog"):
      return Blog;

    case (name = "img"):
      return img;

    case (name = "kakos"):
      return kakos;

    case (name = "elvira"):
      return Elvira;

    case (name = "creation"):
      return Creation;

    case (name = "emperdonadas"):
      return Emperdonadas;

    default:
      break;
  }
};
