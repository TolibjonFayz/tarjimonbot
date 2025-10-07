const { bot } = require("../core/bot");
const UserLang = require("../db/Language");

bot.action("english", async (ctx) => {
  try {
    const newUserLang = {
      lang: "english",
      userid: ctx.from.id,
    };

    const isExists = await UserLang.findOne({ userid: newUserLang.userid });
    if (isExists == null) {
      await UserLang.create(newUserLang)
        .then(async (res) => {
          ctx.reply("Ingliz tili tanlandi");
        })
        .catch((err) => console.log(err));
    } else {
      await UserLang.updateOne({ userid: ctx.from.id }, { lang: "english" });
      ctx.reply("Ingliz tili tanlandi");
    }
  } catch (err) {
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
    console.log(`<b>Ko'zda tutilmagan xatolik</b> \n ${err}`);
  }
});

bot.action("russian", async (ctx) => {
  try {
    const newUserLang = {
      lang: "russian",
      userid: ctx.from.id,
    };

    const isExists = await UserLang.findOne({ userid: newUserLang.userid });
    if (isExists == null) {
      await UserLang.create(newUserLang)
        .then(async (res) => {
          ctx.reply("Rus tili tanlandi");
        })
        .catch((err) => console.log(err));
    } else {
      await UserLang.updateOne({ userid: ctx.from.id }, { lang: "russian" });
      ctx.reply("Rus tili tanlandi");
    }
  } catch (err) {
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
    console.log(`<b>Ko'zda tutilmagan xatolik</b> \n ${err}`);
  }
});

bot.action("uzb", async (ctx) => {
  try {
    const newUserLang = {
      lang: "uzb",
      userid: ctx.from.id,
    };

    const isExists = await UserLang.findOne({ userid: newUserLang.userid });
    if (isExists == null) {
      await UserLang.create(newUserLang)
        .then(async (res) => {
          ctx.reply("O'zbek tili tanlandi");
        })
        .catch((err) => console.log(err));
    } else {
      await UserLang.updateOne({ userid: ctx.from.id }, { lang: "uzb" });
      ctx.reply("O'zbek tili tanlandi");
    }
  } catch (err) {
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
    console.log(`<b>Ko'zda tutilmagan xatolik</b> \n ${err}`);
  }
});
