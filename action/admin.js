const { bot } = require("../core/bot");
const UserDB = require("../db/User");

bot.command("allusers", async (ctx) => {
  if (ctx.from.id == process.env.ADMIN) {
    const users = await UserDB.countDocuments();
    ctx.replyWithHTML(
      `Botingizdagi barcha foydalanuvchilar soni <b>${users}ta</b>`
    );
  }
});
