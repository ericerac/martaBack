const mongoose = require("mongoose");
const EmailUnique = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  name:{ type: String, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetLink:{
    data:String,
    default:"",
  }
},
{
  timestamps:true,
  });

adminSchema.plugin(EmailUnique);

module.exports = mongoose.model("admin", adminSchema);