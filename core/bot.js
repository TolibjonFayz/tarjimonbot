const { Telegraf } = require("telegraf");
const { config } = require("dotenv");
const mongoose = require("mongoose");

config();
const bot = new Telegraf(process.env.TOKEN);
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected successfully"))
  .catch((err) => console.log(err));

bot.launch().then(console.log("Bot is working "));

module.exports = { bot };
