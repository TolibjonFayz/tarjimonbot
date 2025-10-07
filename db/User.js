const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  username: { type: String },
  userid: { type: Number, required: true, unique: true },
});

const User = model("TarjimonUser", UserSchema);
module.exports = User;
