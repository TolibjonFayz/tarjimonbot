const { bot } = require("../core/bot");
const User = require("../db/User");

bot.on("text", async (ctx) => {
  if (
    ctx.from.id == process.env.ADMIN &&
    ctx.message.text.startsWith("/elon")
  ) {
    const elon = ctx.message.text.split(" | ");
    const users = await User.find();
    for (const i of users) {
      await ctx.telegram.sendMessage(i.userid, elon[1]);
    }
  }

  if (
    ctx.from.id == process.env.ADMIN &&
    ctx.message.text.startsWith("/allusers")
  ) {
    const users = await User.countDocuments();
    ctx.replyWithHTML(
      `Botingizdagi barcha foydalanuvchilar soni <b>${users}ta</b>`
    );
  }
});
