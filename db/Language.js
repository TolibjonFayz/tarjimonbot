const { Schema, model } = require("mongoose");

const UserLanguageSchema = new Schema({
  lang: { type: String, required: true },
  userid: { type: Number, required: true, unique: true },
});

const UserLang = model("TarjimonUserLang", UserLanguageSchema);
module.exports = UserLang;
