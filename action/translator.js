const { bot } = require("../core/bot");
const UserLang = require("../db/Language");
const translate = require("google-translate-api-x");

bot.on("text", async (ctx) => {
  // // // Userni holati qaysi tildaligini bilamiz
  const userlang = await UserLang.findOne({ userid: ctx.from.id });

  // // // Kelayotgan matn qaysi tildaligini bilamiz
  const textlang = await translate(ctx.message.text, {
    from: "auto",
    to: "en",
  });
  const detectedLanguage = textlang.from.language.iso;

  // // // Lest translate 
  // If user language is english
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
});
