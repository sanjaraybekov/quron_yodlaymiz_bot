const { Telegraf } = require("telegraf");

const bot = new Telegraf("5259679287:AAELWsIupsDZOOP7XVDeCpidEDUO0NhGvcc");

bot.help((ctx) => ctx.reply("What?"));

bot.settings((ctx) => ctx.reply("You entered settings. Bro!"));

bot.start((ctx, next) => {
  ctx.reply("Hello " + ctx.from.first_name + "!");
  next(ctx);
});

bot.hears("Hello", (ctx) => {
  ctx.reply(
    "What's up! Send me sticker or some text or you can send me audio too!"
  );
});

bot.on("sticker", (ctx) => {
  ctx.reply("Oh, thanks! Type me your username, then i return your nike name");
});

bot.on("text", (ctx, next) => {
  ctx.state.myBirthday = "May 7";
  ctx.state.first_name = ctx.from.first_name;
  ctx.reply("Thanks for your typing!");
  next(ctx);
});

bot.on("audio", (ctx) => {
  ctx.reply("Thanks for your audio :)");
});

bot.mention("@sanjaraybekov", (ctx) => {
  ctx.reply(
    `Thanks! Your nike name is ${ctx.from.first_name}. Enter your phone number please like this (93)847-83-77`
  );
});

bot.phone("(93)847-83-77", (ctx) => {
  ctx.reply('Thanks! Type "hash" with hashtag :)');
});
bot.hashtag("#hash", (ctx) => {
  ctx.reply("Thanks you are so cute!");
});

bot.use((ctx,next) => {
  ctx.telegram.sendMessage(
    ctx.from.id,
    "Hi! I'm a bot and your birthday is " + ctx.state.myBirthday
  );
  next(ctx);
});

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.from.id,
    "Hi! I'm a bot and your nike name is " + ctx.state.first_name,
    {
      parse_mode: "Markdown",
      disable_notification: true,
    }
  );

  ctx.reply(
    ctx.from.id,
    "Hi! I'm a bot and your nike name is " + ctx.state.first_name,
    {
      parse_mode: "Markdown",
      disable_notification: true,
    }
  );
});

bot.launch();
