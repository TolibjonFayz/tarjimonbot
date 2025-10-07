const { bot } = require("../core/bot");
const UserDB = require("../db/User");
const { Markup } = require("telegraf");

bot.start(async (ctx) => {
  ctx.replyWithHTML(
    "Assalomu Alaykum, iltimos to'liq ism familiyangizni kiriting!\n\nNamuna: <b>Alijon Valijonov Alisher o'g'li (qizi)</b>"
  );
  try {
    const newUser = {
      userid: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      state: "ism_familiya",
    };

    const isExists = await UserDB.findOne({ userid: newUser.userid });
    if (isExists == null) {
      await UserDB.create(newUser)
        .then(async (res) => {
          const count = await UserDB.find();
          ctx.telegram.sendMessage(
            process.env.ADMIN,
            `${newUser.first_name} bazaga qo'shildi.\nBazadagi jami foydalanuvchilar soni ${count.length}ta`
          );
        })
        .catch((err) => console.log(err));
    } else {
      const user = await UserDB.findOne({ userid: ctx.from.id });
      await user.updateOne({ state: "ism_familiya" });
      console.log("Eski user start bosdi");
    }
  } catch (err) {
    console.log(err);
    ctx.replyWithHTML(`<b>Ko'zda tutilmagan xatolik</b>`);
    console.log(`<b>Ko'zda tutilmagan xatolik</b> \n ${err}`);
  }
});

bot.on("text", async (ctx) => {
  const user = await UserDB.findOne({ userid: ctx.from.id });
  if (user && user.state === "ism_familiya") {
    await UserDB.updateOne(
      { userid: ctx.from.id },
      { state: "age", first_name: ctx.message.text }
    );
    ctx.reply("Endi yoshingizni kiriting:");
    // ctx.reply(
    //   "Endi telefon raqamingizni yuboring",
    //   Markup.keyboard([
    //     Markup.button.contactRequest("Telefon raqamni yuborish 📞"),
    //   ])
    //     .oneTime()
    //     .resize()
    // );
  } else if (user && user.state === "age") {
    await UserDB.updateOne(
      { userid: ctx.from.id },
      { state: "region", age: ctx.message.text }
    );
    ctx.reply("Qaysi tumandansiz?");
  } else if (user && user.state === "region") {
    await UserDB.updateOne(
      { userid: ctx.from.id },
      { state: "language", location: ctx.message.text }
    );
    ctx.reply("Qaysi til(lar)ni bilasiz?");
  } else if (user && user.state === "language") {
    await UserDB.updateOne(
      { userid: ctx.from.id },
      { state: "whereToGo", languagesHeKnows: ctx.message.text }
    );
    ctx.reply("Qayersi davlatga bormoqchisiz?");
  } else if (user && user.state === "whereToGo") {
    await UserDB.updateOne(
      { userid: ctx.from.id },
      { state: "done", whereToGo: ctx.message.text }
    );
    ctx.replyWithHTML("Ma'lumotlaringiz qabul qilindi. Rahmat!");
    ctx.telegram.sendMessage(
      process.env.ADMIN2,
      `Yangi foydalanuvchi: ${ctx.from.first_name}\n\nTo'liq ism familiyasi: ${user.first_name}\nYoshi: ${user.age}\nQaysi tumandansiz: ${user.location}\nQaysi til(lar)ni biladi: ${user.languagesHeKnows}\nQayersi davlatga bormoqchi: ${user.whereToGo}`
    );
  } else {
    ctx.replyWithHTML("Ha ota, og'riq bormi?");
  }
});

bot.on("contact", async (ctx) => {
  await UserDB.updateOne(
    { userid: ctx.from.id },
    { phonenumber: ctx.message.contact.phone_number }
  );
  ctx.reply("Endi yoshingizni kiriting");
});
