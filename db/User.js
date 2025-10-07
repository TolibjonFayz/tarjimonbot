const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  fullname: { type: String },
  age: { type: Number },
  phonenumber: { type: String },
  state: { type: String },
  location: { type: String },
  languagesHeKnows: { type: String },
  whereToGo: { type: String },
  username: { type: String },
  userid: { type: Number, required: true, unique: true },
});

const UserDB = model("ShofirkonMigratsiyaBot", UserSchema);
module.exports = UserDB;
