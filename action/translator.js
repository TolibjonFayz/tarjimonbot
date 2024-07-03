const { bot } = require("../core/bot");
const UserLang = require("../db/Language");
// const translate = require("google-translate-api-x");
const { translate } = require("bing-translate-api");

bot.on("text", async (ctx) => {
  // // // Userni holati qaysi tildaligini bilamiz
  const userlang = await UserLang.findOne({ userid: ctx.from.id });

  // // // Kelayotgan matn qaysi tildaligini bilamiz
  const textlang = await translate(ctx.message.text, null, "en");
  const detectedLanguage = textlang.language.from;

  // // // Lest translate
  // If user language is english
  if (userlang.lang == "english") {
    if (detectedLanguage == "uz") {
      const result = await translate(ctx.message.text, "uz", "en");
      ctx.reply(result.translation);
    } else {
      const result = await translate(ctx.message.text, null, "uz");
      ctx.reply(result.translation);
    }
  }

  // If user language is russian
  if (userlang.lang == "russian") {
    if (detectedLanguage == "ru") {
      const result = await translate(ctx.message.text, "ru", "uz");
      ctx.reply(result.translation);
    } else {
      const result = await translate(ctx.message.text, null, "ru");
      ctx.reply(result.translation);
    }
  }

  // If user language is uzb
  if (userlang.lang == "uzb") {
    if (detectedLanguage == "uz") {
      ctx.reply(
        "O'zbek tilida emas boshqa tildagi matn kiriting yoki boshqa tilni tanlang 👉 /start"
      );
    } else {
      const result = await translate(ctx.message.text, null, "uz");
      ctx.reply(result.translation);
    }
  }
});
