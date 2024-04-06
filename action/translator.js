const { bot } = require("../core/bot");
const UserLang = require("../db/Language");
const { translate } = require("@vitalets/google-translate-api");
const User = require("../db/User");

bot.on("text", async (ctx) => {
  // // // // // // // // // // // // // // // // // // // // // // // // Admin
  if (
    ctx.from.id == process.env.ADMIN &&
    ctx.message.text.startsWith("/elon")
  ) {
    const elon = ctx.message.text.split(" | ");
    const users = await User.find();
    for (const i of users) {
      await ctx.telegram.sendMessage(i.userid, elon[1]);
    }
  } else {
    // // // // // // // // // // // // // Userni holati qaysi tildaligini bilamiz
    const userlang = await UserLang.findOne({ userid: ctx.from.id });

    // // // Kelayotgan matn qaysi tildaligini bilamiz
    const textlang = await translate(ctx.message.text, {
      from: "auto",
      to: "en",
    });
    const detectedLanguage = textlang.raw.src;

    // // // Lest translate
    // If user language is english
    try {
      if (userlang.lang == "english") {
        if (detectedLanguage == "uz") {
          const result = await translate(ctx.message.text, { to: "en" });
          ctx.reply(result.text);
        } else {
          const result = await translate(ctx.message.text, { to: "uz" });
          ctx.reply(result.text);
        }
      }

      // If user language is russian
      if (userlang.lang == "russian") {
        if (detectedLanguage == "uz") {
          const result = await translate(ctx.message.text, { to: "ru" });
          ctx.reply(result.text);
        } else {
          const result = await translate(ctx.message.text, { to: "uz" });
          ctx.reply(result.text);
        }
      }

      // If user language is uzb
      if (userlang.lang == "uzb") {
        if (detectedLanguage == "uz") {
          ctx.reply(
            "O'zbek tilida emas boshqa tildagi matn kiriting yoki boshqa tilni tanlang 👉 /start"
          );
        } else {
          const result = await translate(ctx.message.text, { to: "uz" });
          ctx.reply(result.text);
        }
      }
    } catch (error) {
      ctx.reply("Iltimos botni qayta ishga tushiring - /start ");
    }
  }
});
