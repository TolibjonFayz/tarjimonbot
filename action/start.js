const { bot } = require("../core/bot");
const User = require("../db/User");
const { Markup } = require("telegraf");

bot.start(async (ctx) => {
  try {
    ctx.replyWithHTML(
      "Assalomu Alaykum, tilni tanlang:",
      Markup.inlineKeyboard([
        [Markup.button.callback("Ingliz tili 🇺🇸", "english")],
        [Markup.button.callback("Rus tili 🇷🇺", "russian")],
        [Markup.button.callback("O'zbek tili 🇺🇿", "uzb")],
      ])
    );
  } catch (err) {
    console.log(err);
  }

  try {
    const newUser = {
      userid: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
    };

    const isExists = await User.findOne({ userid: newUser.userid });
    if (isExists == null) {
      await User.create(newUser)
        .then(async (res) => {
          const count = await User.find();
          ctx.telegram.sendMessage(
            process.env.ADMIN,
            `${newUser.first_name} bazaga qo'shildi.\nBazadagi jami foydalanuvchilar soni ${count.length}ta`
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Eski user start bosdi");
    }
  } catch (err) {
    console.log(err);
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
    console.log(`<b>Ko'zda tutilmagan xatolik</b> \n ${err}`);
  }
});
