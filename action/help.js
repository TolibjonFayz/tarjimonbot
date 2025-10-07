const { bot } = require("../core/bot");

bot.help((ctx) => {
  let text =
    `Bizning botimizda bajarish mumkin bo'lgan komandalar:\n` +
    `/start - botni ishga tushiruvchi buyruq \n` +
    `/info - botni ishlatish haqida ma'lumot`;
  try {
    ctx.replyWithHTML(text);
  } catch (err) {
    console.log(err);
  }
});

bot.command("info", async (ctx) => {
  const userlang = await UserLang.findOne({ userid: ctx.from.id });

  if (userlang.lang == "english") {
    ctx.reply(
      "Botimiz ingliz tilida kiritgan matningizni o'zbek tiliga tarjima qiladi.\nO'zbek tili kiritgan matnigizni esa ingliz tiliga tarjima qiladi.\n\nBoshladikmi 🙂!"
    );
  }

  if (userlang.lang == "russian") {
    ctx.reply(
      "Botimiz rus tilida kiritgan matningizni o'zbek tiliga tarjima qiladi.\nO'zbek tili kiritgan matnigizni esa rus tiliga tarjima qiladi.\n\nBoshladikmi 🙂!"
    );
  }

  if (userlang.lang == "uzb") {
    ctx.replyWithHTML(
      "Botimiz <b>deyarli barcha tildagi</b> kiritgan matningizni o'zbek tiliga tarjima qiladi.\n\nBoshladikmi 🙂!"
    );
  }
});
